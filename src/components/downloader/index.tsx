/* eslint-disable indent */
import { Link, navigate } from 'gatsby'
import React, { useCallback, useEffect, useState } from 'react'

import Columns from 'react-bulma-components/lib/components/columns'

import {
  getPlaylistLinks,
  getTrackLink,
  handleDownloadErr,
  Playlist,
  Track
} from '../../api'

import BeatLoader from 'react-spinners/BeatLoader'

import { useQueryParam, StringParam } from 'use-query-params'
import useTheme from '../../hooks/theme'
import TrackList from '../track-list'
import { isFirebaseURL, isURL } from '../../lib/util'
import {
  downloadCountKey,
  getActiveUserData,
  setLocalStorageItem
} from '../../lib/active-user'
import share from '../../lib/share'
import { DownloadTypes } from '../../types/downloadTypes'
import DownloaderInputBar from './DownloaderInputBar'
import { dlFunc } from './types'
import DownloaderMediaInfo from './DownloaderMediaInfo'
import { useTabContext } from '../../context/TabContext'
import { Toaster } from 'react-hot-toast'
let downloadFile
let downloadPlaylist
if (typeof window !== 'undefined') {
  const downloadStuff = require('../../lib/download')
  downloadFile = downloadStuff.downloadFile
  downloadPlaylist = downloadStuff.downloadPlaylist
}

interface DownloaderTabsProps {
  activeTab: DownloadTypes
}

const DownloaderTabs = ({ activeTab }: DownloaderTabsProps) => {
  const tabs = Object.keys(DownloadTypes).map((key) => {
    return (
      <Link
        key={`tab-link-${key}`}
        to={`/${DownloadTypes[key]}`}
        style={{
          fontWeight: DownloadTypes[key] === activeTab ? 600 : 400,
          color: DownloadTypes[key] === activeTab ? '#FF3300' : '#B9B9B9'
        }}>
        {DownloadTypes[key].toUpperCase()}
      </Link>
    )
  })

  return (
    <Columns className="is-mobile">
      <Columns.Column className="is-full-mobile is-two-third-tablet is-one-third-desktop">
        <div
          className="has-text-left tab-link"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            overflowX: 'scroll',

            letterSpacing: '0.3rem'
          }}>
          {tabs}
        </div>
      </Columns.Column>
    </Columns>
  )
}

interface submitFunc {
  submit: (text: string) => Promise<void>
}

const Downloader = () => {
  const { activeTab } = useTabContext()
  const [url, _] = useQueryParam('url', StringParam)
  const [text, setText] = useState<string>(url)
  const [loading, setLoading] = useState<boolean>(false)
  const [downloaded, setDownloaded] = useState<boolean>(false)
  const [media, setMedia] = useState<Track | Playlist>()
  const [download, setDownload] = useState<dlFunc>()
  const [downloading, setDownloading] = useState<boolean>(false)
  const [err, setErr] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)
  const theme = useTheme()

  const submit = useCallback(
    async (text: string) => {
      if (loading || downloaded) return
      if (!isURL(text) && !isFirebaseURL(text)) {
        setErr('That URL is invalid, please try another one.')
        return
      }
      if (
        !text.includes('/sets/') &&
        activeTab === DownloadTypes.Playlist &&
        !isFirebaseURL(text)
      ) {
        setErr('That is not a playlist URL.')
        return
      }
      const { downloads } = getActiveUserData()
      setLocalStorageItem(downloadCountKey, downloads + 1)
      setLoading(true)
      if (activeTab === DownloadTypes.Track) {
        try {
          const { url, title, author, imageURL } = await getTrackLink(text)
          setMedia({ url, title, author, imageURL } as Track)

          const dlFunc = async () => {
            try {
              setDownloading(true)
              await downloadFile(url, title)
            } catch (err) {
              console.log(err)
              setErr('Failed to download, try refreshing the page.')
            }
            setDownloaded(true)
            setDownloading(false)
          }

          setLoading(false)
          setDownload({ dlFunc })
        } catch (err) {
          console.log(err)
          handleDownloadErr(activeTab, err, setErr)
          setLoading(false)
        }
        return
      }
      try {
        const {
          url,
          title,
          tracks,
          author,
          copyrightedTracks,
          imageURL
        } = await getPlaylistLinks(text, activeTab === DownloadTypes.Likes)
        setMedia({
          url,
          title,
          tracks,
          author,
          copyrightedTracks,
          imageURL
        } as Playlist)
        const dlFunc = async () => {
          const setProgressWrapper = (prog: number) => {
            console.log(prog)
            setProgress(prog)
          }
          setDownloading(true)
          try {
            await downloadPlaylist(title, tracks, setProgressWrapper)
          } catch (err) {
            console.log(err)
            setErr('Failed to download, try refreshing the page.')
          }
          setDownloaded(true)
          setDownloading(false)
        }
        setLoading(false)
        setDownload({ dlFunc })
      } catch (err) {
        console.log(err)
        handleDownloadErr(activeTab, err, setErr)
        setLoading(false)
      }
    },
    [loading, downloaded]
  )

  useEffect(() => {
    if (activeTab !== DownloadTypes.Track) {
      const dlFunc = async () => {
        const setProgressWrapper = (prog: number) => {
          console.log(prog)
          setProgress(prog)
        }
        setDownloading(true)
        try {
          await downloadPlaylist(
            media.title,
            (media as Playlist).tracks,
            setProgressWrapper
          )
        } catch (err) {
          console.log(err)
          setErr('Failed to download, try refreshing the page.')
        }
        setDownloaded(true)
        setDownloading(false)
      }

      setDownload({ dlFunc })
    }
  }, [media])
  return (
    <div
      style={{
        backgroundColor: theme.containerBackground,
        padding: '1.5rem 2.5rem',
        borderRadius: '10px',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }}>
      <Toaster />
      <Columns>
        <Columns.Column size={12}>
          <DownloaderTabs activeTab={activeTab} />
        </Columns.Column>

        <Columns.Column size={12}>
          <DownloaderInputBar
            hasMedia={!!media}
            hasDownloaded={downloaded}
            isLoading={loading}
            submit={submit}
            text={text}
            setText={setText}
          />
        </Columns.Column>

        {media ? (
          ''
        ) : (
          <Columns.Column size={12}>
            <p
              style={{
                color: '#FF0D59',
                fontWeight: 400,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <span style={{ display: 'block' }}>
                {err}{' '}
                {err
                  ? "If you're having trouble downloading a large amount of tracks, try using our desktop app"
                  : ''}
              </span>
              {err ? (
                <a
                  href="https://app.downloadsound.cloud/"
                  className={'button is-primary'}
                  style={{
                    fontWeight: 500,
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    display: 'block',
                    marginLeft: '1rem'
                  }}>
                  Get app
                </a>
              ) : (
                ''
              )}
            </p>
          </Columns.Column>
        )}

        {media ? (
          <Columns.Column size={12}>
            <DownloaderMediaInfo
              share={() => share(activeTab, text)}
              progress={progress}
              downloading={downloading}
              dlFunc={download}
              media={media}
            />{' '}
          </Columns.Column>
        ) : (
          ''
        )}

        {media ? (
          <Columns.Column size={12}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}>
              <p style={{ color: '#FF0D59', fontWeight: 400 }}>
                {err}{' '}
                {err
                  ? "If you're downloading a large amount of tracks, try using our desktop app."
                  : ''}
              </p>{' '}
              {err ? (
                <a
                  href="https://app.downloadsound.cloud/"
                  className={'button is-primary'}
                  style={{
                    fontWeight: 500,
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    marginLeft: '1rem'
                  }}>
                  Get app
                </a>
              ) : (
                ''
              )}
            </div>
          </Columns.Column>
        ) : (
          ''
        )}

        {media && activeTab !== DownloadTypes.Track ? (
          <Columns.Column size={12}>
            <TrackList media={media as Playlist} setMedia={setMedia} />
          </Columns.Column>
        ) : (
          ''
        )}
      </Columns>
    </div>
  )
}

export default Downloader
