import axios from 'axios'

export interface SoundcloudResource {
  title: string
  url: string
  author: { username: string }
  imageURL: string
}

export interface PlaylistTrack {
  title: string
  url: string
  hls: true
  author: string
}

export interface Playlist extends SoundcloudResource {
  tracks: PlaylistTrack[]
  copyrightedTracks: string[]
}

export interface Track extends SoundcloudResource {}

const api = axios.create({
  baseURL: process.env.GATSBY_API_URL
})

export const getTrackLink = async (link: string) => {
  const {
    data: { url, title, author, imageURL }
  } = await api.post('track', { url: link })
  return { url, title, author, imageURL } as Track
}

export const getPlaylistLinks = async (url: string, likes: boolean) => {
  const {
    data: { title, tracks, author, copyrightedTracks, imageURL }
  } = await api.post(likes ? 'likes' : 'playlist', { url })
  return { title, tracks, author, copyrightedTracks, imageURL } as Playlist
}
