import { gql } from 'graphql-request'
export const GET_ALL_VIDEOS = gql`
    query {
        videos {
            id
            slug
            description
            title
            seen
            tags
            createdAt
            thumbnail {
                url
            }
            mp4 {
                url
            }
        }
    }
`

export const GET_VIDEO_DETAILS = gql`
    query($pageSlug: String){
        video(
            where: {
                slug:  $pageSlug
            } 
        )
        {
            id
            description
            title
            slug
            seen
            tags
            createdAt
            thumbnail {
                url
            }
            mp4 {
                url
            }
        }
    }
`

export const GET_ACCOUNT_DETAIL = gql`
query($id: ID) {
    account(where:{ id: $id }) {
      username
      avatar {
        url
      }
    }
  }
`

export const UPDATE_SEEN = gql`
    mutation ($slug: String){
        updateVideo(
            where:{
                slug:  $slug
            }, 
            data:{
                seen: true
            }
        ) 
        {
            id
            seen
            title
        }
    }
`

export const PUBLISHED_VIDEO = gql`
    mutation ($slug: String){
        publishVideo(where:{
            slug: $slug
        }, 
            to: PUBLISHED
        ) 
        {
            slug
        }
    }
`