import toast from 'react-hot-toast'
import gtag from './gtag'
import { DownloadTypes } from '../types/downloadTypes'

const share = (activeTab: DownloadTypes, text: string) => {
  gtag('event', 'share', {
    event_category: 'Share',
    event_label: 'Share Link Click',
    value: `${activeTab}/${text}`
  })
  navigator.clipboard.writeText(
    `${window.location.origin}/${activeTab}?url=${text}`
  )
  toast('Share link copied to clipboard!')
}

export default share
