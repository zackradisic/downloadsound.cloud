import { useMediaQuery } from '@react-hook/media-query'
import Progress from 'react-bulma-components/lib/components/progress'
import Image from 'react-bulma-components/lib/components/image'
import React from 'react'
import Columns from 'react-bulma-components/lib/components/columns'
import { Playlist, Track } from '../../api'
import useTheme from '../../hooks/theme'
import { BeatLoader } from 'react-spinners'
import { Toaster } from 'react-hot-toast'
import getProgressHint from '../../lib/progress'
import { dlFunc } from './types'

interface Props<T extends Track | Playlist> {
  media: T
  dlFunc: dlFunc
  downloading: boolean
  progress: number
  share: () => void
}
const DownloaderMediaInfo = <T extends Track | Playlist>({
  share,
  downloading,
  dlFunc,
  media,
  progress
}: Props<T>) => {
  const theme = useTheme()
  const isTrack = !(media as Playlist).tracks
  const matches = useMediaQuery('only screen and (max-width: 768px)')
  const borderRadius = matches ? '' : '10px'
  let copyrightedTracks: string = ''
  const onClick = () => {
    if (downloading) return
    dlFunc.dlFunc()
  }

  if (!isTrack) {
    if ((media as Playlist).copyrightedTracks) {
      copyrightedTracks = (media as Playlist).copyrightedTracks
        .map((title) => `"${title}"`)
        .join(', ')
    }
  }

  return (
    <Columns>
      <Columns.Column size={4}>
        <Image
          size="square"
          src={media.imageURL}
          style={{ borderRadius: '10px' }}
        />
      </Columns.Column>
      <Columns.Column className="media-info" style={{ height: '100%' }}>
        <div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: theme.containerTitle
            }}>
            {media.title}
            {isTrack ? (
              ''
            ) : (
              <p
                style={{
                  marginLeft: '1rem',
                  color: theme.textHint,
                  display: 'inline',
                  fontWeight: 400,
                  fontSize: '1rem'
                }}>
                {(media as Playlist).tracks.length} tracks
              </p>
            )}
          </h1>
        </div>
        <p style={{ color: theme.textRegular }}>by {media.author.username}</p>
        <a
          onClick={onClick}
          className="button is-primary"
          style={{
            fontWeight: 500,
            bottom: 0,
            marginTop: '3rem',
            borderRadius: borderRadius
          }}>
          {downloading ? (
            <BeatLoader loading={downloading} size={8} color="white" />
          ) : (
            'Download'
          )}
        </a>

        <a
          onClick={share}
          className="button is-primary is-outlined"
          style={{
            marginLeft: '1.5rem',
            fontWeight: 500,
            bottom: 0,
            marginTop: '3rem',
            borderRadius: borderRadius
          }}>
          Share
        </a>

        {isTrack ? (
          ''
        ) : (
          <>
            <Progress
              style={{ marginTop: '3rem' }}
              className="is-primary"
              max={1}
              value={progress}
              size="small"
            />
            <p style={{ color: theme.textRegular }}>
              {getProgressHint(progress)}
            </p>
          </>
        )}

        {copyrightedTracks ? (
          <p style={{ color: '#ff0a3b', fontWeight: 600 }}>
            {'The following tracks will not be downloaded because of copyright: ' +
              copyrightedTracks}
          </p>
        ) : (
          ''
        )}
      </Columns.Column>
      <Toaster />
    </Columns>
  )
}

export default DownloaderMediaInfo
