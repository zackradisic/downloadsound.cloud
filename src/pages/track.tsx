import React from 'react'

import './style.css'
import { DownloadPage } from './_download'

import { DownloadTypes } from '../types/downloadTypes'

const TrackDownloadPage = () => {
  return <DownloadPage activeTab={DownloadTypes.Track} />
}

export default TrackDownloadPage
