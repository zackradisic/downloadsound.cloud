import { Link } from 'gatsby'
import React, { useState } from 'react'
import Columns from 'react-bulma-components/lib/components/columns'

import scdl from 'soundcloud-downloader'

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
    submit: (text: string) => Promise<void>
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

const DownloaderInputBar = ({ text, setText, submit }: DownloaderInputBarProps) => {
  const onChange = (e) => {
    setText(e.target.value)
  }

  const submitWrapper = async () => {
    console.log('fuck')
    if (!scdl.isValidUrl(text)) {
      alert('Invalid URL: ' + text)
    }

    submit(text)
  }
  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input value={text} onChange={onChange} className="input" type="text" placeholder="Enter a SoundCloud.com link..." />
      </div>
      <div className="control">
        <a onClick={submitWrapper} className="button is-primary" style={{ fontWeight: 500 }}>
            Download
        </a>
      </div>
    </div>
  )
}

const Downloader = ({ activeTab }: DownloaderProps) => {
  const [text, setText] = useState<string>('')

  const submit = async (text: string) => {
    const data = await scdl.download(text)
    console.log(data)
  }
  return (
    <Columns>
      <Columns.Column size={12}>
        <DownloaderTabs activeTab={activeTab}/>
      </Columns.Column>

      <Columns.Column size={12}>
        <DownloaderInputBar submit={submit} text={text} setText={setText} />
      </Columns.Column>
    </Columns>
  )
}

export default Downloader
