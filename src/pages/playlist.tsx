import React from 'react'
import { DownloadTypes } from '../components/downloader'

import './style.css'
import { DownloadPage, DownloadState } from './_download'
import { WindowLocation } from '@reach/router'

const PlaylistDownloadPage = () => {
  return (
    <DownloadPage activeTab={DownloadTypes.Playlist}/>
  )
}

export default PlaylistDownloadPage
