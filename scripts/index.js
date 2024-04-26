import fs from 'fs'
import axios from 'axios'
import { BaseURL, defaultHeaders, GraphqlParams, VtuberIDs } from './constants.js'
import { getLastSaturdayString, getIsNewTweet } from './utils.js'

const client = axios.create({
    baseURL: BaseURL,
    headers: {
        ...defaultHeaders,
        get: {
            'x-guest-token': fs.readFileSync('guest-token', 'utf8'),
        },
    },
})

client.interceptors.response.use((response) => {
    return response
}, (error) => {

    if (error.response) {
        console.log('error response: ', error.response.data)
        if (error.response.data.errors?.[0].code === 239 ) { // need to fetch new guest token
            return getGuestToken().then((token) => {
                console.log('new token generated: ', token)
                fs.writeFile('guest-token', token, (err) => {
                    if (err) console.error('guest token file writing error', err)
                })
                client.defaults.headers.get['x-guest-token'] = token
                error.config.headers.set('x-guest-token', token)
                return client.request(error.config) 
            })
        } else if (error.response.data.code === 88 ) { // rate limit exceeded, need to retry
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('retry to fetch new token')
                    resolve(client.request(error.config))
                }, 1000)
            })
        }

        return Promise.reject(`${error.response.status}\n${JSON.stringify(error.response.data)}]}`)
    } else if (error.request) {
        return Promise.reject(`no res: ${error.request}`)
    }
    return Promise.reject(`request settings error, ${error.message}`)
})

function buildParams(params) {
    const formattedParams = {}
    for (let key in params) {
        formattedParams[key] = JSON.stringify(params[key])
    }
    return formattedParams
}

function getPinnedTweet(username = '') {
    const url = `${GraphqlParams.UserByScreenName}/UserByScreenName`
    const request = client.get(url, {
        params: buildParams({
            variables: {
                screen_name: username,
                withSafetyModeUserFields: true
            },
            features: {
                hidden_profile_likes_enabled: true,
                hidden_profile_subscriptions_enabled: true,
                responsive_web_graphql_exclude_directive_enabled: true,
                verified_phone_label_enabled: false,
                subscriptions_verification_info_is_identity_verified_enabled: true,
                subscriptions_verification_info_verified_since_enabled: true,
                highlights_tweets_tab_ui_enabled: true,
                responsive_web_twitter_article_notes_tab_enabled: false,
                creator_subscriptions_tweet_preview_api_enabled: true,
                responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
                responsive_web_graphql_timeline_navigation_enabled: true,
            },
        })
    })
    return request.then(({ data }) => {
        return data.data?.user?.result?.legacy?.pinned_tweet_ids_str
    }).catch((err) => {
        throw new Error(`getPinnedTweet for ${username} failed: ${err}`)
    })
}

function getTweetDetails(id = '') {
    const url = `${GraphqlParams.TweetResultByRestId}/TweetResultByRestId`
    const request = client.get(url, {
        params: buildParams({
            variables: {
                tweetId: id,
                withCommunity: false,
                includePromotedContent: false,
                withVoice: false
            },
            features: {
                creator_subscriptions_tweet_preview_api_enabled: true,
                c9s_tweet_anatomy_moderator_badge_enabled: true,
                tweetypie_unmention_optimization_enabled: true,
                responsive_web_edit_tweet_api_enabled: true,
                graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
                view_counts_everywhere_api_enabled: true,
                longform_notetweets_consumption_enabled: true,
                responsive_web_twitter_article_tweet_consumption_enabled: false,
                tweet_awards_web_tipping_enabled: false,
                responsive_web_home_pinned_timelines_enabled: true,
                freedom_of_speech_not_reach_fetch_enabled: true,
                standardized_nudges_misinfo: true,
                tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
                longform_notetweets_rich_text_read_enabled: true,
                longform_notetweets_inline_media_enabled: true,
                responsive_web_graphql_exclude_directive_enabled: true,
                verified_phone_label_enabled: false,
                responsive_web_media_download_video_enabled: false,
                responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
                responsive_web_graphql_timeline_navigation_enabled: true,
                responsive_web_enhance_cards_enabled: false,
            },
        })
    })
    return request.then(({ data }) => {
        if (data?.data?.tweetResult?.result?.legacy) {
            const { created_at, full_text, entities, id_str } = data.data.tweetResult.result.legacy
            return {
                id: id_str,
                created_at,
                full_text,
                img: entities?.media?.[0]?.media_url_https,
                height: entities?.media?.[0]?.sizes?.medium?.h,
                width: entities?.media?.[0]?.sizes?.medium?.w,
                type: entities?.media?.[0]?.type,
            }
        }
    }).catch((err) => {
        throw new Error(`getTweetDetails for ${id} failed: ${err}`)
    })
}

async function updateData() {
    let data = {}
    const filename = getLastSaturdayString()
    fs.readFile(`../public/data/${filename}.json`, (err, res) => {
        if (err) {
            if (err.code === 'ENOENT') return
            throw new Error(`load json failed: ${err}`)
        } else{
            data = JSON.parse(res)
        }
    })

    for (let i = 0; i < VtuberIDs.length; i++) {
        const vtuberID = VtuberIDs[i]
        const pinnedTweets = await getPinnedTweet(vtuberID)
        if (pinnedTweets?.length) {
            const tweetDetails = await getTweetDetails(pinnedTweets?.[0])
            if (tweetDetails) {
                console.log('success get pinned tweet for', vtuberID)
                if (getIsNewTweet(tweetDetails.created_at) && (!data[vtuberID] || (data[vtuberID]?.id !== tweetDetails.id && tweetDetails.type === 'photo'))) {
                    data[vtuberID] = tweetDetails
                }
            }
        }
    }
    fs.writeFile(`../public/data/${filename}.json`, JSON.stringify(data, null, 2), (err) => {
        if (err) console.error(err)
    })
}

function getGuestToken() {
    return client.post('https://api.twitter.com/1.1/guest/activate.json').then(({ data }) => {
        return data.guest_token
    }).catch((err) => {
        throw new Error(`getGuestToken failed: ${err}`)
    })
}

updateData()
