/* eslint-disable indent */
import { Link, navigate } from 'gatsby'
import React, { useEffect, useState } from 'react'
import Img from 'gatsby-image'

import Columns from 'react-bulma-components/lib/components/columns'
import Image from 'react-bulma-components/lib/components/image'
import Progress from 'react-bulma-components/lib/components/progress'

import { getPlaylistLinks, getTrackLink, Playlist, Track } from '../api'

import BeatLoader from 'react-spinners/BeatLoader'

import { useQueryParam, StringParam } from 'use-query-params'
import { useMediaQueries, useMediaQuery } from '@react-hook/media-query'
import useTheme from '../hooks/theme'
import toast, { Toaster } from 'react-hot-toast'
import gtag from '../lib/gtag'
import getProgressHint from '../lib/progress'
import TrackList from './track-list'
import { isFirebaseURL, isURL } from '../lib/util'
import {
  downloadCountKey,
  getActiveUserData,
  setLocalStorageItem
} from '../lib/active-user'
let downloadFile
let downloadPlaylist
if (typeof window !== 'undefined') {
  const downloadStuff = require('../lib/download')
  downloadFile = downloadStuff.downloadFile
  downloadPlaylist = downloadStuff.downloadPlaylist
}

const invalidLinks = [
  'https://soundcloud.com/discover',
  'https://soundcloud.com/you/likes'
]

export enum DownloadTypes {
  Track = 'track',
  Playlist = 'playlist',
  Likes = 'likes'
}

interface DownloaderProps {
  activeTab: DownloadTypes
}

interface DownloaderTabsProps {
  activeTab: DownloadTypes
}

interface DownloaderInputBarProps {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  submit: (text: string) => Promise<void>
  activeTab: DownloadTypes
  isLoading: boolean
  hasDownloaded: boolean
  hasMedia: boolean
}

interface DownloaderMediaInfoProps<T extends Track | Playlist> {
  media: T
  dlFunc: dlFunc
  downloading: boolean
  progress: number
  share: () => void
}

const DownloaderTabs = ({ activeTab }: DownloaderTabsProps) => {
  const tabs = Object.keys(DownloadTypes).map((key) => {
    return (
      <Link
        key={`tab-link-${key}`}
        to={`/${DownloadTypes[key]}`}
        style={{
          fontWeight: DownloadTypes[key] === activeTab ? 600 : 400,
          color: DownloadTypes[key] === activeTab ? '#FF3300' : '#B9B9B9'
        }}>
        {DownloadTypes[key].toUpperCase()}
      </Link>
    )
  })

  return (
    <Columns className="is-mobile">
      <Columns.Column className="is-full-mobile is-two-third-tablet is-one-third-desktop">
        <div
          className="has-text-left tab-link"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            overflowX: 'scroll',

            letterSpacing: '0.3rem'
          }}>
          {tabs}
        </div>
      </Columns.Column>
    </Columns>
  )
}

const DownloaderInputBar = ({
  hasMedia,
  hasDownloaded,
  isLoading,
  activeTab,
  text,
  setText,
  submit
}: DownloaderInputBarProps) => {
  const theme = useTheme()
  const [color, setColor] = useState<string>('is-primary')
  const matches = useMediaQuery('only screen and (max-width: 768px)')
  const size = matches ? '' : 'is-medium'
  const borderRadius = matches ? '' : '10px'
  const marginLeft = matches ? '' : '20px'
  const valid = (text: string) => {
    if (invalidLinks.includes(text.toLowerCase())) return false
    if (isURL(text)) {
      try {
        if (isFirebaseURL(text)) return activeTab
        const u = new URL(text)
        if (u.pathname.indexOf('/discover/sets/personalized-tracks::') === 0) {
          return DownloadTypes.Track
        }
        return u.pathname.includes('/sets/')
          ? DownloadTypes.Playlist
          : activeTab === DownloadTypes.Playlist
          ? DownloadTypes.Track
          : activeTab
      } catch (err) {
        return false
      }
    }

    return false
  }

  const onPaste = (e) => {
    e.preventDefault()
    const val = e.clipboardData.getData('Text')
    setText(val)

    const tab = valid(val)
    if (!tab) {
      setColor('is-danger')
    } else {
      if (tab === activeTab) {
        setColor('is-primary')
      } else {
        navigate('/' + tab + '?url=' + val)
      }
    }
  }

  const onChange = (e) => {
    e.preventDefault()
    const val = e.target.value
    setText(val)

    const tab = valid(val)
    if (!tab) {
      setColor('is-danger')
    } else {
      if (tab === activeTab) {
        setColor('is-primary')
      } else {
        navigate('/' + tab + '?url=' + val)
      }
    }
  }

  let placeholder = 'Enter a SoundCloud.com track link...'

  if (activeTab === DownloadTypes.Playlist) {
    placeholder = 'Enter a SoundCloud.com playlist link...'
  } else if (activeTab === DownloadTypes.Likes) {
    placeholder = 'Enter a SoundCloud.com profile link...'
  }

  const submitWrapper = async () => {
    gtag('event', 'download_click', {
      event_category: 'Downloader Click',
      event_label: `${activeTab} click`,
      value: text
    })
    submit(text)
  }
  return (
    <div
      className="field has-addons"
      style={{ backgroundColor: theme.containerBackground }}>
      <div className="control is-expanded">
        <input
          id="download-input"
          style={{
            borderRadius: borderRadius,
            backgroundColor: theme.containerBackground,
            color: theme.textRegular
          }}
          disabled={hasMedia}
          value={text}
          onPaste={onPaste}
          onChange={onChange}
          className={'input ' + size + ' ' + color}
          type="text"
          placeholder={placeholder}
        />
      </div>
      <div className="control">
        {!hasMedia ? (
          <a
            onClick={submitWrapper}
            className={`button is-primary ${size}`}
            style={{
              fontWeight: 500,
              borderRadius: borderRadius,
              marginLeft: marginLeft,
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}>
            {!isLoading ? 'Download' : ''}
            <BeatLoader
              loading={isLoading}
              size={8}
              color={theme.containerBackground}
            />
          </a>
        ) : (
          <Link to="">
            <a
              onClick={submitWrapper}
              className={`button is-primary ${size}`}
              style={{
                fontWeight: 500,
                borderRadius: borderRadius,
                marginLeft: marginLeft,
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}>
              Download another
            </a>{' '}
          </Link>
        )}
      </div>
    </div>
  )
}

const DownloaderMediaInfo = <T extends Track | Playlist>({
  share,
  downloading,
  dlFunc,
  media,
  progress
}: DownloaderMediaInfoProps<T>) => {
  const theme = useTheme()
  const isTrack = !(media as Playlist).tracks
  const matches = useMediaQuery('only screen and (max-width: 768px)')
  const borderRadius = matches ? '' : '10px'
  let copyrightedTracks: string = ''
  const onClick = () => {
    if (downloading) return
    dlFunc.dlFunc()
  }

  if (!isTrack) {
    if ((media as Playlist).copyrightedTracks) {
      copyrightedTracks = (media as Playlist).copyrightedTracks
        .map((title) => `"${title}"`)
        .join(', ')
    }
  }

  return (
    <Columns>
      <Columns.Column size={4}>
        <Image
          size="square"
          src={media.imageURL}
          style={{ borderRadius: '10px' }}
        />
      </Columns.Column>
      <Columns.Column className="media-info" style={{ height: '100%' }}>
        <div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: theme.containerTitle
            }}>
            {media.title}
            {isTrack ? (
              ''
            ) : (
              <p
                style={{
                  marginLeft: '1rem',
                  color: theme.textHint,
                  display: 'inline',
                  fontWeight: 400,
                  fontSize: '1rem'
                }}>
                {(media as Playlist).tracks.length} tracks
              </p>
            )}
          </h1>
        </div>
        <p style={{ color: theme.textRegular }}>by {media.author.username}</p>
        <a
          onClick={onClick}
          className="button is-primary"
          style={{
            fontWeight: 500,
            bottom: 0,
            marginTop: '3rem',
            borderRadius: borderRadius
          }}>
          {downloading ? (
            <BeatLoader loading={downloading} size={8} color="white" />
          ) : (
            'Download'
          )}
        </a>

        <a
          onClick={share}
          className="button is-primary is-outlined"
          style={{
            marginLeft: '1.5rem',
            fontWeight: 500,
            bottom: 0,
            marginTop: '3rem',
            borderRadius: borderRadius
          }}>
          Share
        </a>

        {isTrack ? (
          ''
        ) : (
          <>
            <Progress
              style={{ marginTop: '3rem' }}
              className="is-primary"
              max={1}
              value={progress}
              size="small"
            />
            <p style={{ color: theme.textRegular }}>
              {getProgressHint(progress)}
            </p>
          </>
        )}

        {copyrightedTracks ? (
          <p style={{ color: '#ff0a3b', fontWeight: 600 }}>
            {'The following tracks will not be downloaded because of copyright: ' +
              copyrightedTracks}
          </p>
        ) : (
          ''
        )}
      </Columns.Column>
      <Toaster />
    </Columns>
  )
}

interface dlFunc {
  dlFunc: Function
}

interface submitFunc {
  submit: (text: string) => Promise<void>
}

const Downloader = ({ activeTab }: DownloaderProps) => {
  const [url, _] = useQueryParam('url', StringParam)
  const [text, setText] = useState<string>(url)
  const [loading, setLoading] = useState<boolean>(false)
  const [downloaded, setDownloaded] = useState<boolean>(false)
  const [media, setMedia] = useState<Track | Playlist>()
  const [download, setDownload] = useState<dlFunc>()
  const [downloading, setDownloading] = useState<boolean>(false)
  const [err, setErr] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)
  const theme = useTheme()

  const share = () => {
    gtag('event', 'share', {
      event_category: 'Share',
      event_label: 'Share Link Click',
      value: `${activeTab}/${text}`
    })
    navigator.clipboard.writeText(
      `${window.location.origin}/${activeTab}?url=${text}`
    )
    toast('Share link copied to clipboard!')
  }

  const submit = async (text: string) => {
    if (loading || downloaded) return
    if (!isURL(text) && !isFirebaseURL(text)) {
      setErr('That URL is invalid, please try another one.')
      return
    }
    if (
      !text.includes('/sets/') &&
      activeTab === DownloadTypes.Playlist &&
      !isFirebaseURL(text)
    ) {
      setErr('That is not a playlist URL.')
      return
    }
    const { downloads } = getActiveUserData()
    setLocalStorageItem(downloadCountKey, downloads + 1)
    if (activeTab === DownloadTypes.Track) {
      setLoading(true)
      try {
        const { url, title, author, imageURL } = await getTrackLink(text)
        setMedia({ url, title, author, imageURL } as Track)

        const dlFunc = async () => {
          try {
            setDownloading(true)
            await downloadFile(url, title)
          } catch (err) {
            console.log(err)
            setErr('Failed to download, try refreshing the page.')
          }
          setDownloaded(true)
          setDownloading(false)
        }

        setLoading(false)
        setDownload({ dlFunc })
      } catch (err) {
        console.log(err)
        if (err.response) {
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
        } else {
          setErr('An unknown error occured, please try again.')
        }
        setLoading(false)
      }
    } else {
      setLoading(true)
      try {
        const {
          url,
          title,
          tracks,
          author,
          copyrightedTracks,
          imageURL
        } = await getPlaylistLinks(text, activeTab === DownloadTypes.Likes)
        setMedia({
          url,
          title,
          tracks,
          author,
          copyrightedTracks,
          imageURL
        } as Playlist)
        const dlFunc = async () => {
          const setProgressWrapper = (prog: number) => {
            console.log(prog)
            setProgress(prog)
          }
          setDownloading(true)
          try {
            await downloadPlaylist(title, tracks, setProgressWrapper)
          } catch (err) {
            console.log(err)
            setErr('Failed to download, try refreshing the page.')
          }
          setDownloaded(true)
          setDownloading(false)
        }
        setLoading(false)
        setDownload({ dlFunc })
      } catch (err) {
        console.log(err)
        if (err.response) {
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
        } else {
          setErr('An unknown error occured, please try again.')
        }
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (activeTab !== DownloadTypes.Track) {
      const dlFunc = async () => {
        const setProgressWrapper = (prog: number) => {
          console.log(prog)
          setProgress(prog)
        }
        setDownloading(true)
        try {
          await downloadPlaylist(
            media.title,
            (media as Playlist).tracks,
            setProgressWrapper
          )
        } catch (err) {
          console.log(err)
          setErr('Failed to download, try refreshing the page.')
        }
        setDownloaded(true)
        setDownloading(false)
      }

      setDownload({ dlFunc })
    }
  }, [media])
  return (
    <div
      style={{
        backgroundColor: theme.containerBackground,
        padding: '1.5rem 2.5rem',
        borderRadius: '10px',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }}>
      <Columns>
        <Columns.Column size={12}>
          <DownloaderTabs activeTab={activeTab} />
        </Columns.Column>

        <Columns.Column size={12}>
          <DownloaderInputBar
            hasMedia={!!media}
            hasDownloaded={downloaded}
            isLoading={loading}
            activeTab={activeTab}
            submit={submit}
            text={text}
            setText={setText}
          />
        </Columns.Column>

        {media ? (
          ''
        ) : (
          <Columns.Column size={12}>
            <p style={{ color: '#ff0a3b', fontWeight: 600 }}>{err}</p>
          </Columns.Column>
        )}

        {media ? (
          <Columns.Column size={12}>
            <DownloaderMediaInfo
              share={share}
              progress={progress}
              downloading={downloading}
              dlFunc={download}
              media={media}
            />{' '}
          </Columns.Column>
        ) : (
          ''
        )}

        {media ? (
          <Columns.Column size={12}>
            <p style={{ color: '#ff0a3b', fontWeight: 600 }}>{err}</p>{' '}
          </Columns.Column>
        ) : (
          ''
        )}

        {media && activeTab !== DownloadTypes.Track ? (
          <Columns.Column size={12}>
            <TrackList media={media as Playlist} setMedia={setMedia} />
          </Columns.Column>
        ) : (
          ''
        )}
      </Columns>
    </div>
  )
}

export default Downloader
