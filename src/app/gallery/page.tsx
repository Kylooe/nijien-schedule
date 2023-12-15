'use client'

import * as React from 'react'
// import dynamic from 'next/dynamic'
import Image from 'next/image'
import { groupBy, keys } from 'lodash'

import data from 'public/test.json'
import { vtubers } from '@/lib/constants'

type VtuberTwitterID = keyof typeof data

const list = groupBy(vtubers, 'group')

// const Scrollbars = dynamic(() => import('rc-scrollbars'), { ssr: false })

const Gallery: React.FC = () => {
  // const [isClient, setIsClient] = React.useState(false)
  const [isActive, setIsActive] = React.useState(false)
  const [targetImg, setTargetImg] = React.useState('')

  // React.useEffect(() => {
  //   setIsClient(true)
  // }, [])

  // if (!isClient) {
  //   return null
  // }

  return (
    <div>
    {/* <Scrollbars> */}
      {keys(list).map((group) => (
        <div key={group} className="flex justify-between items-stretch flex-nowrap">
          {list[group].map((item) => (
            <div
              key={item.name}
              className={`flex-1 ${/Aia|Sonny|YuQ/.test(item.twitter) ? 'text-black' : 'text-white'}`}
            >
              {data[item.twitter as VtuberTwitterID] ? (
                <Image
                  src={data[item.twitter as VtuberTwitterID].img}
                  width={1200}
                  height={675}
                  sizes={`${100 / list[group].length}vw`}
                  alt={item.name}
                  className="hover:opacity-75 cursor-pointer"
                  onClick={() => {
                    setTargetImg(data[item.twitter as VtuberTwitterID].img)
                    setIsActive(true)
                  }}
                />
              ) : (
                <div
                  className="flex justify-center items-center h-full"
                  style={{
                    height: `${100 / list[group].length * 675 / 1200}vw`,
                    backgroundColor: item.color,
                  }}
                >
                  <p className="font-bold text-xl">{item.name}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      {isActive && (
        <div
          onClick={() => setIsActive(false)}
          className="fixed left-0 top-0 w-screen h-screen flex justify-center items-center overflow-hidden bg-black/50"
        >
          <Image
            src={targetImg}
            width={1200}
            height={675}
            alt="schedule"
            className="max-w-screen"
          />
        </div>
      )}
    {/* </Scrollbars> */}
    </div>
  )
}

export default Gallery
