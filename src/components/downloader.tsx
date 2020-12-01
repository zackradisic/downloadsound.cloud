import { Link, navigate } from 'gatsby'
import React, { useState } from 'react'
import Img from 'gatsby-image'

import Columns from 'react-bulma-components/lib/components/columns'
import Image from 'react-bulma-components/lib/components/image'
import Progress from 'react-bulma-components/lib/components/progress'

import scdl from 'soundcloud-downloader'
import { getPlaylistLinks, getTrackLink, Playlist, Track } from '../api'

import BeatLoader from 'react-spinners/BeatLoader'

import { useQueryParam, StringParam } from 'use-query-params'
import { useMediaQueries, useMediaQuery } from '@react-hook/media-query'
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
    activeTab: DownloadTypes,
}

interface DownloaderTabsProps {
    activeTab: DownloadTypes,
}

interface DownloaderInputBarProps {
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
    submit: (text: string) => Promise<void>,
    activeTab: DownloadTypes,
    isLoading: boolean,
    hasDownloaded: boolean,
    hasMedia: boolean
}

interface DownloaderMediaInfoProps<T extends Track | Playlist> {
  media: T,
  dlFunc: dlFunc,
  downloading: boolean,
  progress: number
}

const DownloaderTabs = ({ activeTab }: DownloaderTabsProps) => {
  const tabs = Object.keys(DownloadTypes).map(key => {
    return (
      <Link key={`tab-link-${key}`} to={`/${DownloadTypes[key]}`} style={{
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
        <div className="has-text-left tab-link" style={{
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

const DownloaderInputBar = ({ hasMedia, hasDownloaded, isLoading, activeTab, text, setText, submit }: DownloaderInputBarProps) => {
  const [color, setColor] = useState<string>('is-primary')
  const matches = useMediaQuery('only screen and (max-width: 768px)')
  const size = matches ? '' : 'is-medium'
  const borderRadius = matches ? '' : '10px'
  const marginLeft = matches ? '' : '20px'
  const valid = (text: string) => {
    if (invalidLinks.includes(text.toLowerCase())) return false
    if (scdl.isValidUrl(text)) {
      return text.includes('/sets/') ? DownloadTypes.Playlist : activeTab === DownloadTypes.Playlist ? DownloadTypes.Track : activeTab
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
    submit(text)
  }
  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input id="download-input" style={{ borderRadius: borderRadius }} disabled={hasMedia} value={text} onPaste={onPaste} onChange={onChange} className={'input ' + size + ' ' + color} type="text" placeholder={placeholder} />
      </div>
      <div className="control">
        { !hasMedia
          ? <a onClick={submitWrapper} className={`button is-primary ${size}`} style={{ fontWeight: 500, borderRadius: borderRadius, marginLeft: marginLeft, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            {!isLoading ? 'Download' : ''}
            <BeatLoader loading={isLoading} size={8} color="white"/>
          </a> : <Link to="">
            <a onClick={submitWrapper} className={`button is-primary ${size}`} style={{ fontWeight: 500, borderRadius: borderRadius, marginLeft: marginLeft, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>Download another</a> </Link>}

      </div>
    </div>
  )
}

const DownloaderMediaInfo = <T extends Track | Playlist>({ downloading, dlFunc, media, progress }: DownloaderMediaInfoProps<T>) => {
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
      copyrightedTracks = (media as Playlist).copyrightedTracks.map(title => `"${title}"`).join(', ')
    }
  }
  return (
    <Columns>
      <Columns.Column size={4} >
        <Image size="square" src={media.imageURL} style={{ borderRadius: '10px' }}/>
      </Columns.Column>
      <Columns.Column className="media-info" style={{ height: '100%' }}>
        <h1 style={{ fontSize: '24px', color: '#3F3F3F', fontWeight: 600 }}>{media.title}</h1>
        <p>{media.author.username}</p>
        <a onClick={onClick} className="button is-primary" style={{ fontWeight: 500, bottom: 0, marginTop: '3rem', borderRadius: borderRadius }}>
          {downloading ? <BeatLoader loading={downloading} size={8} color="white"/> : 'Download'}
        </a>

        {isTrack ? '' : <Progress style={{ marginTop: '3rem' }} className="is-primary" max={1} value={progress} size="small" />}

        {
          copyrightedTracks ? <p style={{ color: '#ff0a3b', fontWeight: 600 }}>{'The following tracks will not be downloaded because of copyright: ' + copyrightedTracks}</p> : ''
        }
      </Columns.Column>
    </Columns>
  )
}

interface dlFunc {
  dlFunc: Function
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

  const submit = async (text: string) => {
    if (loading || downloaded) return
    if (!scdl.isValidUrl(text)) {
      setErr('That URL is invalid, please try another one.')
      return
    }
    if (!text.includes('/sets/') && activeTab === DownloadTypes.Playlist) {
      setErr('That is not a playlist URL.')
      return
    }
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
        const { url, title, tracks, author, copyrightedTracks, imageURL } = await getPlaylistLinks(text, activeTab === DownloadTypes.Likes)
        setMedia({ url, title, tracks, author, copyrightedTracks, imageURL } as Playlist)
        const dlFunc = async () => {
          const setProgressWrapper = (prog: number) => { console.log(prog); setProgress(prog) }
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
            setErr("Could not find that playlist/track. Make sure it's a valid link to a track/playlist.")
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
    }
  }
  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem 2.5rem', borderRadius: '10px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <Columns>
        <Columns.Column size={12}>
          <DownloaderTabs activeTab={activeTab}/>
        </Columns.Column>

        <Columns.Column size={12}>
          <DownloaderInputBar hasMedia={!!media} hasDownloaded={downloaded} isLoading={loading} activeTab={activeTab} submit={submit} text={text} setText={setText} />
        </Columns.Column>

        {media ? '' : <Columns.Column size={12}><p style={{ color: '#ff0a3b', fontWeight: 600 }}>{err}</p></Columns.Column>}

        {media ? <Columns.Column size={12}><DownloaderMediaInfo progress={progress} downloading={downloading} dlFunc={download} media={media} /> </Columns.Column> : ''}

        {media ? <Columns.Column size={12}><p style={{ color: '#ff0a3b', fontWeight: 600 }}>{err}</p> </Columns.Column> : ''}
      </Columns>
    </div>
  )
}

export default Downloader
