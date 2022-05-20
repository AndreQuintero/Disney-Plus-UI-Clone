/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useState } from 'react'
import { graphQLClient } from '../../graphql/client'
import {  GET_ALL_VIDEOS, GET_VIDEO_DETAILS } from '../../graphql/query'

const Video = ({video}) => {
    const [watching, setWatching] = useState(false)
    return (
        <>
            {!watching && <img className="video-image" src={video.thumbnail.url} alt={video.title} /> }
            {!watching && <div className="info">
                <p>{video.tags.join(', ')}</p>
                <p>{video.description}</p>
                <Link href="/">
                    <a>Go back</a>
                </Link>
                <button className="video-overlay" 
                    onClick={() => {
                        watching ? setWatching(false) : setWatching(true)
                    }}
                >
                    Play
                </button>
            </div> }
            {watching && (
                <video className="video" controls autoPlay>
                    <source src={video.mp4.url} type="video/mp4"/>
                </video>
            )}
            <div className="info-footer" onClick={() => watching ? setWatching(false) : null}> 

            </div>
        </>
    )
}

export default Video

export const getStaticPaths = async () => {
    const data = await graphQLClient.request(GET_ALL_VIDEOS)
    const paths = data?.videos.map((video) => {
        return {
            params: {
                slug: video?.slug
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}


export const getStaticProps = async (context) => {
    const slug = context.params.slug
    const data = await graphQLClient.request(GET_VIDEO_DETAILS, { pageSlug: slug})
    const video = data?.video
  
    return {
        props: {
            video
        }
    }
}
