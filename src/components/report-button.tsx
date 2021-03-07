import React, { useState } from 'react'
import { reportLink } from '../api'
import { DownloadTypes } from './downloader'

interface Props {
  link: string
  activeTab: DownloadTypes
}
const ReportLinkButton = ({ link, activeTab }: Props) => {
  const [hasReported, setHasReported] = useState<boolean>(false)
  return (
    <a
      onClick={() => {
        setHasReported(true)
        if (!hasReported) reportLink(link, activeTab)
      }}
      className={'button is-primary'}
      style={{
        fontWeight: 500,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        display: 'block',
        marginLeft: '1rem'
      }}>
      {hasReported ? 'Link reported! 🙌' : 'Report broken link'}
    </a>
  )
}

export default ReportLinkButton
