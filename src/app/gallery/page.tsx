'use client'

import * as React from 'react'
// import dynamic from 'next/dynamic'
import Image from 'next/image'
import { groupBy, keys } from 'lodash'

import data from 'public/test.json'
import { vtubers } from '@/lib/constants'

type VtuberTwitterID = keyof typeof data
interface Vtuber {
  name: string
  twitter: VtuberTwitterID
  color: string
  group: string
}

const list = groupBy(vtubers, 'group') as Record<string, Vtuber[]>

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
    <div className="w-full">
    {/* <Scrollbars> */}
      {keys(list).map((group) => (
        <div key={group} className="flex justify-between items-stretch flex-nowrap">
          {list[group].map((item) => (
            data[item.twitter] ? (
              <div
                key={item.name}
                className="basis-0 hover:opacity-75 cursor-pointer"
                style={{ flexGrow: data[item.twitter].width / (data[item.twitter].height ?? 1) }}
              >
              <Image
                src={data[item.twitter].img}
                width={data[item.twitter].width}
                height={data[item.twitter].height}
                alt={item.name}
                className="hover:opacity-75 cursor-pointer"
                onClick={() => {
                    setTargetImg(data[item.twitter].img)
                    setIsActive(true)
                }}
              />
              </div>
            ): (
              <div
                key={item.name}
                className="flex-1 flex justify-center items-center py-8"
                style={{ backgroundColor: item.color }}
              >
                <p className={`font-bold text-xl ${/Aia|Sonny|YuQ/.test(item.twitter) ? 'text-black' : 'text-white'}`}>{item.name}</p>
              </div>
            )
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
            className="max-w-screen max-h-screen object-contain"
          />
        </div>
      )}
    {/* </Scrollbars> */}
    </div>
  )
}

export default Gallery
