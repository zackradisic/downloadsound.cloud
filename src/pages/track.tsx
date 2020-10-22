import React from 'react'
import { DownloadTypes } from '../components/downloader'

import './style.css'
import { DownloadPage, DownloadState } from './_download'

import { WindowLocation } from '@reach/router'

const TrackDownloadPage = () => {
  return (
    <DownloadPage activeTab={DownloadTypes.Track} />
  )
}

export default TrackDownloadPage
