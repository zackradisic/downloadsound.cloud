/* eslint-disable indent */
import axios from 'axios'
import { DownloadTypes } from '../components/downloader'

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

export const handleDownloadErr = (
  activeTab: DownloadTypes,
  err: any,
  setErr: (value: string) => void
) => {
  if (err.response) {
    switch (activeTab) {
      case DownloadTypes.Track:
        handleTrackDownloadErr(err, setErr)
        break
      default:
        handlePlaylistDownloadErr(err, setErr)
        break
    }
  } else {
    setErr('An unknown error occured, please try again.')
  }
}

const handleTrackDownloadErr = (err: any, setErr: (value: string) => void) => {
  switch (err.response.status) {
    case 408:
      setErr('Request timedout, please try again.')
      break
    case 422:
      setErr('URL is invalid')
      break
    case 404:
      setErr('Could not find that playlist/track.')
      break
    case 400:
      if (err.response.data) {
        if (err.response.data.err) {
          setErr(err.response.data.err)
          break
        }
      }
      setErr('An internal server error occured, please try again.')
      break
    default:
      setErr('An internal server error occured, please try again.')
      break
  }
}
const handlePlaylistDownloadErr = (
  err: any,
  setErr: (value: string) => void
) => {
  switch (err.response.status) {
    case 408:
      setErr('Request timedout, please try again.')
      break
    case 422:
      setErr('URL is invalid.')
      break
    case 403:
      setErr('That playlist has too many tracks (maximum is 100).')
      break
    case 404:
      setErr(
        "Could not find that playlist/track. Make sure it's a valid link to a track/playlist."
      )
      break
    case 400:
      if (err.response.data) {
        if (err.response.data.err) {
          setErr(err.response.data.err)
          break
        }
      }
      setErr('An internal server error occured, please try again.')
      break
    case 409:
      if (err.response.data) {
        setErr(err.response.data.err)
        break
      }
      setErr('An internal server error occured, please try again.')
      break
    default:
      setErr('An internal server error occured, please try again.')
      break
  }
}
