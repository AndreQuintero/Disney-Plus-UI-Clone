/* eslint-disable @next/next/no-img-element */

import { graphQLClient } from '../graphql/client'
import { GET_ACCOUNT_DETAIL, GET_ALL_VIDEOS } from '../graphql/query'
import Section from '../components/Section'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'


export default function Home({videos, account}) {
  const [mainVideo, setMainVideo] =  useState()

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
 }

 const filterVideos = (videos, genre) => {
   return videos.filter( (video) => video.tags.includes(genre))
 }

 const unSeenVideos = (videos) => {
  return videos.filter(video => video.seen == false || video.seen == null)
 }

 const videosSeen = (videos) => {
   return videos.filter(video => video.seen)
 }

  useEffect(() => {
    const video = randomVideo(videos)
    setMainVideo(video)
  }, [videos])
  
  return (
    <>
      <Navbar account={account} />
      <div className="app">
        <div className="main-video">
          {!!mainVideo && <img src={mainVideo?.thumbnail?.url} 
          alt={mainVideo?.title}
          />
          }
        </div>
        <div className="video-feed">
          <Link href="#disney">
            <div className="franchise">
              <img src="/disney-button.png" alt="Disney"/>
            </div>
          </Link>
          <Link href="#pixar">
            <div className="franchise">
              <img src="/pixar.png" alt="Pixar"/>
            </div>
          </Link>
          <Link href="#star-wars">
            <div className="franchise">
              <img src="/star-wars-button.png" alt="Star Wars"/>
            </div>
          </Link>
          <Link href="#nat-geo">
            <div className="franchise">
              <img src="/natgeo-button.png" alt="National Geographic"/>
            </div>
          </Link>
          <Link href="#marvel">
            <div className="franchise">
              <img src="/marvel-button.png" alt="Marvel"/>  
            </div>
          </Link>
        </div>
        <Section genre={'Recommend for you'} videos={unSeenVideos(videos)} />
        <Section genre={'Watch again'} videos={videosSeen(videos)} />
        <Section genre={'Family'} videos={filterVideos(videos, 'family')} />
        <Section genre={'Thriller'}  videos={filterVideos(videos, 'thriller')} />
        <Section genre={'Classic'}  videos={filterVideos(videos, 'classic')} />
        <Section genre={'Marvel'} id="marvel" videos={filterVideos(videos, 'marvel')} />
        <Section genre={'Disney'} id="disney" videos={filterVideos(videos, 'disney')} />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const data = await graphQLClient.request(GET_ALL_VIDEOS)
  const videos = data?.videos
  const idAccount = "cl39apoi4gpir0dlxuxuex2eo"
  const accountData = await  graphQLClient.request(GET_ACCOUNT_DETAIL, { id: idAccount})
  const account = accountData?.account
  return {
    props: {
      videos,
      account
    }
  }
}