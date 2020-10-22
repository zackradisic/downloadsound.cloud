import { Link } from 'gatsby'
import React, { useState } from 'react'
import Img from 'gatsby-image'

import Columns from 'react-bulma-components/lib/components/columns'
import Image from 'react-bulma-components/lib/components/image'

import scdl from 'soundcloud-downloader'
import { getPlaylistLinks, getTrackLink, Playlist, Track } from '../api'
import { downloadFile, downloadPlaylist } from '../lib/download'

import BeatLoader from 'react-spinners/BeatLoader'

export enum DownloadTypes {
    Track = 'track',
    Playlist = 'playlist'
}

interface DownloaderProps {
    activeTab: DownloadTypes
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
    console.log(DownloadTypes[key], activeTab)
    return <Columns.Column className="has-text-left tab-link" key={`tab-${key}`} style={{ color: DownloadTypes[key] === activeTab ? '#FF7700' : '#B9B9B9', letterSpacing: '0.3rem' }} size={3}>
      <Link to={`/${DownloadTypes[key]}`}>{DownloadTypes[key].toUpperCase()}</Link>
    </Columns.Column>
  })
  return (
    <Columns>
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
      console.log(text)
      console.log(scdl.isValidUrl(text))
      return scdl.isValidUrl(text) && text.includes('/sets/')
    }
  }

  const onPaste = (e) => {
    console.log('onPaste')
    e.preventDefault()
    const val = e.clipboardData.getData('Text')
    console.log(val)
    setText(val)

    if (valid(val)) {
      setColor('is-primary')
    } else {
      setColor('is-danger')
    }
  }

  const onChange = (e) => {
    e.preventDefault()
    console.log('onChange')
    const val = e.target.value
    setText(e.target.value)

    if (valid(val)) {
      setColor('is-primary')
    } else {
      setColor('is-danger')
    }
  }

  const submitWrapper = async () => {
    if (!scdl.isValidUrl(text)) {
      alert('Invalid URL: ' + text)
    }

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
  console.log(media.author)

  const onClick = () => {
    if (downloading) return
    console.log(dlFunc)
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
  const [text, setText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [downloaded, setDownloaded] = useState<boolean>(false)
  const [media, setMedia] = useState<Track | Playlist>()
  const [download, setDownload] = useState<dlFunc>()
  const [downloading, setDownloading] = useState<boolean>(false)

  const submit = async (text: string) => {
    if (loading || downloaded) return
    if (activeTab === DownloadTypes.Track) {
      setLoading(true)
      const { url, title, author, imageURL } = await getTrackLink(text)
      setMedia({ url, title, author, imageURL } as Track)
      const dlFunc = async () => {
        console.log('FUCK')
        setDownloading(true)
        await downloadFile(url, title)
        setDownloaded(true)
        setDownloading(false)
      }
      setLoading(false)
      setDownload({ dlFunc })
    } else {
      setLoading(true)
      const { url, title, tracks, author, imageURL } = await getPlaylistLinks(text)
      setMedia({ url, title, tracks, author, imageURL } as Playlist)
      const dlFunc = async () => {
        setDownloading(true)
        await downloadPlaylist(title, tracks)
        setDownloaded(true)
        setDownloading(false)
      }
      setLoading(false)
      setDownload({ dlFunc })
    }
  }
  return (
    <Columns>
      <Columns.Column size={12}>
        <DownloaderTabs activeTab={activeTab}/>
      </Columns.Column>

      <Columns.Column size={12}>
        <DownloaderInputBar hasMedia={!!media} hasDownloaded={downloaded} isLoading={loading} activeTab={activeTab} submit={submit} text={text} setText={setText} />
      </Columns.Column>

      <Columns.Column size={12}>

        {media ? <DownloaderMediaInfo downloading={downloading} dlFunc={download} media={media} /> : ''}
      </Columns.Column>
    </Columns>
  )
}

export default Downloader
