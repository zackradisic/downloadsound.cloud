/* eslint-disable indent */
// eslint-disable-next-line indent
import { useMediaQuery } from '@react-hook/media-query'
import { useTabContext } from '../../context/TabContext'
import { Link, navigate } from 'gatsby'
import React, { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import useTheme from '../../hooks/theme'
import gtag from '../../lib/gtag'
import { isFirebaseURL, isURL } from '../../lib/util'
import { DownloadTypes } from '../../types/downloadTypes'

interface Props {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  submit: (text: string) => Promise<void>
  isLoading: boolean
  hasDownloaded: boolean
  hasMedia: boolean
}

const invalidLinks = [
  'https://soundcloud.com/discover',
  'https://soundcloud.com/you/likes'
]

const DownloaderInputBar = ({
  hasMedia,
  hasDownloaded,
  isLoading,
  text,
  setText,
  submit
}: Props) => {
  const { activeTab } = useTabContext()
  const theme = useTheme()
  const [color, setColor] = useState<string>('is-primary')
  const matches = useMediaQuery('only screen and (max-width: 768px)')
  const size = matches ? '' : 'is-medium'
  const borderRadius = matches ? '' : '10px'
  const marginLeft = matches ? '' : '20px'
  const [placeholder, setPlaceholder] = useState<string>(
    activeTab === DownloadTypes.Likes
      ? 'Enter a SoundCloud.com profile link...'
      : activeTab === DownloadTypes.Playlist
      ? 'Enter a SoundCloud.com playlist link...'
      : 'Enter a SoundCloud.com track link...'
  )
  const valid = useCallback((text: string) => {
    if (invalidLinks.includes(text.toLowerCase())) return false
    if (isURL(text)) {
      try {
        if (isFirebaseURL(text)) return activeTab
        const u = new URL(text)
        if (u.pathname.indexOf('/discover/sets/personalized-tracks::') === 0) {
          return DownloadTypes.Track
        }
        return u.pathname.includes('/sets/')
          ? DownloadTypes.Playlist
          : activeTab === DownloadTypes.Playlist
          ? DownloadTypes.Track
          : activeTab
      } catch (err) {
        return false
      }
    }

    return false
  }, [])

  const onPaste = (e) => {
    e.preventDefault()
    const val = e.clipboardData.getData('Text')
    setText(val)

    const tab = valid(val)
    if (!tab) {
      setColor('is-danger')
    } else {
      if (tab === activeTab) {
        setColor('is-primary')
      } else {
        navigate('/' + tab + '?url=' + val)
      }
    }
  }

  const onChange = (e) => {
    e.preventDefault()
    const val = e.target.value
    setText(val)

    const tab = valid(val)
    if (!tab) {
      setColor('is-danger')
    } else {
      if (tab === activeTab) {
        setColor('is-primary')
      } else {
        navigate('/' + tab + '?url=' + val)
      }
    }
  }

  useEffect(() => {
    setPlaceholder(
      activeTab === DownloadTypes.Likes
        ? 'Enter a SoundCloud.com profile link...'
        : activeTab === DownloadTypes.Playlist
        ? 'Enter a SoundCloud.com playlist link...'
        : 'Enter a SoundCloud.com track link...'
    )
  }, [activeTab])

  const submitWrapper = async () => {
    try {
      gtag('event', 'download_click', {
        event_category: 'Downloader Click',
        event_label: `${activeTab} click`,
        value: text
      })
    } catch (err) {
      console.log(err)
    }
    if (!hasMedia) submit(text)
  }
  return (
    <div
      className="field has-addons"
      style={{ backgroundColor: theme.containerBackground }}>
      <div className="control is-expanded">
        <input
          id="download-input"
          style={{
            borderRadius: borderRadius,
            backgroundColor: theme.containerBackground,
            color: theme.textRegular
          }}
          disabled={hasMedia}
          value={text}
          onPaste={onPaste}
          onChange={onChange}
          className={'input ' + size + ' ' + color}
          type="text"
          placeholder={placeholder}
        />
      </div>
      <div className="control">
        {!hasMedia ? (
          <a
            onClick={submitWrapper}
            className={`button is-primary ${size}`}
            style={{
              fontWeight: 500,
              borderRadius: borderRadius,
              marginLeft: marginLeft,
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}>
            {!isLoading ? 'Download' : ''}
            <BeatLoader
              loading={isLoading}
              size={8}
              color={theme.containerBackground}
            />
          </a>
        ) : (
          <Link to="">
            <a
              onClick={submitWrapper}
              className={`button is-primary ${size}`}
              style={{
                fontWeight: 500,
                borderRadius: borderRadius,
                marginLeft: marginLeft,
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}>
              Download another
            </a>{' '}
          </Link>
        )}
      </div>
    </div>
  )
}

export default DownloaderInputBar
