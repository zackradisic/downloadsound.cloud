import { Link } from 'gatsby'
import React, { useState } from 'react'
import Img from 'gatsby-image'

import Columns from 'react-bulma-components/lib/components/columns'
import Image from 'react-bulma-components/lib/components/image'

import scdl from 'soundcloud-downloader'
import { getPlaylistLinks, getTrackLink, Playlist, Track } from '../api'

import BeatLoader from 'react-spinners/BeatLoader'

import { useQueryParam, StringParam } from 'use-query-params'
let downloadFile
let downloadPlaylist
if (typeof window !== 'undefined') {
  const downloadStuff = require('../lib/download')
  downloadFile = downloadStuff.downloadFile
  downloadPlaylist = downloadStuff.downloadPlaylist
}

export enum DownloadTypes {
    Track = 'track',
    Playlist = 'playlist'
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
  downloading: boolean
}

const DownloaderTabs = ({ activeTab }: DownloaderTabsProps) => {
  const tabs = Object.keys(DownloadTypes).map(key => {
    return <Columns.Column className="has-text-left tab-link" key={`tab-${key}`} style={{ fontWeight: DownloadTypes[key] === activeTab ? 600 : 400, color: DownloadTypes[key] === activeTab ? '#FF7700' : '#B9B9B9', letterSpacing: '0.3rem' }} size={3}>
      <Link to={`/${DownloadTypes[key]}`}>{DownloadTypes[key].toUpperCase()}</Link>
    </Columns.Column>
  })
  return (
    <Columns className="is-mobile">
      {tabs}
    </Columns>
  )
}

const DownloaderInputBar = ({ hasMedia, hasDownloaded, isLoading, activeTab, text, setText, submit }: DownloaderInputBarProps) => {
  const [color, setColor] = useState<string>('is-primary')
  const valid = (text: string) => {
    if (activeTab === DownloadTypes.Track) {
      return scdl.isValidUrl(text) && !text.includes('/sets/')
    } else {
      return scdl.isValidUrl(text) && text.includes('/sets/')
    }
  }

  const onPaste = (e) => {
    e.preventDefault()
    const val = e.clipboardData.getData('Text')
    setText(val)

    if (valid(val)) {
      setColor('is-primary')
    } else {
      setColor('is-danger')
    }
  }

  const onChange = (e) => {
    e.preventDefault()
    const val = e.target.value
    setText(e.target.value)

    if (valid(val)) {
      setColor('is-primary')
    } else {
      setColor('is-danger')
    }
  }

  const submitWrapper = async () => {
    submit(text)
  }
  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input disabled={hasMedia} value={text} onPaste={onPaste} onChange={onChange} className={'input' + ' ' + color} type="text" placeholder="Enter a SoundCloud.com link..." />
      </div>
      <div className="control">
        { !hasMedia
          ? <a onClick={submitWrapper} className="button is-primary" style={{ fontWeight: 500 }}>
            {!isLoading ? 'Download' : ''}
            <BeatLoader loading={isLoading} size={8} color="white"/>
          </a> : <Link to="">
            <a onClick={submitWrapper} className="button is-primary" style={{ fontWeight: 500 }}>Download another</a> </Link>}

      </div>
    </div>
  )
}

const DownloaderMediaInfo = <T extends Track | Playlist>({ downloading, dlFunc, media }: DownloaderMediaInfoProps<T>) => {
  const isTrack = !!(media as Playlist).tracks

  const onClick = () => {
    if (downloading) return
    dlFunc.dlFunc()
  }
  return (
    <Columns>
      <Columns.Column size={4} >
        <Image size="square" src={media.imageURL} style={{ borderRadius: '5px' }}/>
      </Columns.Column>
      <Columns.Column className="media-info" style={{ height: '100%' }}>
        <h1 style={{ fontSize: '24px', color: '#3F3F3F', fontWeight: 600 }}>{media.title}</h1>
        <p>{media.author.username}</p>
        <a onClick={onClick} className="button is-primary" style={{ fontWeight: 500, bottom: 0, marginTop: '3rem' }}>
          {downloading ? <BeatLoader loading={downloading} size={8} color="white"/> : 'Download'}
        </a>
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
        const { url, title, tracks, author, imageURL } = await getPlaylistLinks(text)
        setMedia({ url, title, tracks, author, imageURL } as Playlist)
        const dlFunc = async () => {
          setDownloading(true)
          try {
            await downloadPlaylist(title, tracks)
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
        switch (err.response.status) {
        case 408:
          setErr('Request timedout, please try again.')
          break
        case 422:
          setErr('URL is invalid')
          break
        case 403:
          setErr('That playlist has too many tracks (maximum is 100)')
          break
        default:
          setErr('An internal server error occured, please try again.')
          break
        }
        setLoading(false)
      }
    }
  }
  return (
    <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '5px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <Columns>
        <Columns.Column size={12}>
          <DownloaderTabs activeTab={activeTab}/>
        </Columns.Column>

        <Columns.Column size={12}>
          <DownloaderInputBar hasMedia={!!media} hasDownloaded={downloaded} isLoading={loading} activeTab={activeTab} submit={submit} text={text} setText={setText} />
        </Columns.Column>

        {media ? '' : <Columns.Column size={12}><p style={{ color: '#ff0a3b', fontWeight: 600 }}>{err}</p></Columns.Column>}

        {media ? <Columns.Column size={12}><DownloaderMediaInfo downloading={downloading} dlFunc={download} media={media} /> </Columns.Column> : ''}

        {media ? <Columns.Column size={12}><p style={{ color: '#ff0a3b', fontWeight: 600 }}>{err}</p> </Columns.Column> : ''}
      </Columns>
    </div>
  )
}

export default Downloader
