import React from 'react'

import './style.css'
import { DownloadPage, DownloadState } from './_download'
import { WindowLocation } from '@reach/router'
import { DownloadTypes } from '../types/downloadTypes'

const PlaylistDownloadPage = () => {
  return <DownloadPage activeTab={DownloadTypes.Playlist} />
}

export default PlaylistDownloadPage
