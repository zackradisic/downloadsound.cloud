import React from 'react'
import { DownloadTypes } from '../types/downloadTypes'

import './style.css'
import { DownloadPage } from './_download'

const IndexPage = () => {
  return <DownloadPage activeTab={DownloadTypes.Track} />
}

export default IndexPage
