import axios from 'axios'
import fs from 'fs'
import { Authorization, BaseURL, GraphqlParams, VtuberIDs } from './constants.js'

const client = axios.create({
    baseURL: BaseURL,
    headers: {
        accept: '*/*',
        authorization: Authorization,
        'content-type': 'application/json; charset=utf-8',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        // 'x-twitter-active-user': 'yes',
        // 'x-twitter-client-language': 'zh-cn',
        // Referer: 'https://twitter.com/',
    }
})

function buildParams(params) {
    const formattedParams = {}
    for (let key in params) {
        formattedParams[key] = JSON.stringify(params[key])
    }
    return formattedParams
}

async function getPinnedTweet(username = '') {
    const url = `${GraphqlParams.UserByScreenName}/UserByScreenName`
    const request = client.get(url, {
        headers: {
            'x-guest-token': '1734877265836785706',
        },
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
    return request.then((res) => {
        console.log('getpinned', username)
        return res.data?.data?.user?.result?.legacy?.pinned_tweet_ids_str
    }).catch((err) => {
        console.error(`getPinnedTweet for ${username} failed: `, err.response?.status, '\n', err.response?.data?.errors)
    })
}

function getTweetDetails(id = '') {
    const url = `${GraphqlParams.TweetResultByRestId}/TweetResultByRestId`
    const request = client.get(url, {
        headers: {
            'x-guest-token': '1734877265836785706',
        },
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
        console.log('getTweetDetails', id)
        if (data?.data?.tweetResult?.result?.legacy) {
            const { created_at, full_text, entities } = data.data.tweetResult.result.legacy
            return {
                created_at,
                full_text,
                img: entities?.media?.[0]?.media_url_https
            }
        }
    }).catch((err) => {
        console.error(`getTweetDetails for ${id} failed: `, err.response?.status, '\n', err.response?.data?.errors)
    })
}

async function updateData() {
    const data = {}
    for (let i = 0; i < VtuberIDs.length; i++) {
        console.log(i)
        const id = VtuberIDs[i]
        const pinnedTweets = await getPinnedTweet(id)
        if (pinnedTweets?.length) {
            const tweetDetails = await getTweetDetails(pinnedTweets?.[0])
            if (tweetDetails) data[id] = tweetDetails
        }
    }
    fs.writeFile('./data/test.json', JSON.stringify(data), (err) => {
        if (err) console.error(err)
    })
}

updateData()
