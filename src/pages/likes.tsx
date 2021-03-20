import React from 'react'

import './style.css'
import { DownloadPage, DownloadState } from './_download'
import { WindowLocation } from '@reach/router'
import { DownloadTypes } from '../types/downloadTypes'

const LikesDownloadPage = () => {
  return <DownloadPage activeTab={DownloadTypes.Likes} />
}

export default LikesDownloadPage
