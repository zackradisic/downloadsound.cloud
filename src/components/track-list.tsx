import React, { useEffect, useState } from 'react'
import { Playlist, PlaylistTrack, Track } from '../api'

import Columns from 'react-bulma-components/lib/components/columns'

interface TrackListProps {
    media: Playlist,
    setMedia: React.Dispatch<React.SetStateAction<Track | Playlist>>
}

interface TrackListItemProps {
    title: string,
    index: number,
    author: string,
    deleteTrack: (num: number) => void
}

interface TrackListPaginationProps {
  pages: number,
  currentPage: number,
  setPage: (num: number) => void,
  deleteTrack: (num: number) => void
}

const TrackListPagination = ({ pages, currentPage, setPage }: TrackListPaginationProps) => {
  const p = []
  for (let x = 0; x < pages; x++) {
    if (x === currentPage) {
      p.push(<span style={{ color: '#C8C7C7', cursor: 'pointer' }} onClick={() => setPage(x)}>•</span>)
    } else {
      p.push(<span style={{ cursor: 'pointer' }}onClick={() => setPage(x)}>•</span>)
    }
  }
  return (
    <div style={{ color: '#545454', fontSize: '1.5rem', letterSpacing: '1.5rem' }}>
      {p}
    </div>
  )
}

const TrackListItem = ({ title, index, author, deleteTrack }: TrackListItemProps) => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '10px', paddingBottom: '10px', overflowX: 'scroll' }}>

        <p style={{ flexShrink: 0, color: '#B5B5B5', marginBottom: '0px' }}>{index}.</p>
        <p style={{ flexShrink: 1, marginLeft: '1rem', color: '#8F8F8F', overflowX: 'hidden', marginBottom: '0px' }}><span style={{ color: '#E9E9E9', overflowX: 'hidden' }}>{title}</span>   — {author}</p>

        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <a href="#" onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => e.preventDefault()}><h1 style={{ marginBottom: '0px', letterSpacing: '0.1rem', color: '#B9B9B9', fontSize: '0.875rem', cursor: 'pointer' }} onClick={() => deleteTrack(index - 1)}>REMOVE</h1></a>
        </div>

      </div>
      <div style={{ borderBottom: '1px solid #282828' }}></div>
    </>
  )
}

const TrackList = ({ media, setMedia }: TrackListProps) => {
  const [hidden, setHidden] = useState<boolean>(true)
  const [pageNum, setPageNum] = useState<number>(0)
  // eslint-disable-next-line no-undef
  const [items, setItems] = useState<JSX.Element[]>()
  const pages = Math.ceil(media.tracks.length / 10)

  const deleteTrack = (num: number) => setMedia(
    {
      ...media,
      tracks: media.tracks.slice(0, num).concat(media.tracks.slice(num + 1, media.tracks.length))
    }
  )

  useEffect(() => {
    setItems(
      media.tracks.slice(pageNum * 10, pageNum * 10 + 10).map((track: PlaylistTrack, index: number) => <TrackListItem key={`track-list-item-${track.title}-${track.author}`}title={track.title} author={track.author} index={index + 1 + (pageNum * 10) } deleteTrack={deleteTrack} />)
    )
  }, [pageNum, media])

  return (
    <>
      <p style={{ color: '#858585', cursor: 'pointer' }} onClick={() => setHidden(!hidden)}>{hidden ? 'Open track list' : 'Close track list'}</p>
      <div style={{ borderBottom: '1px solid #282828' }} />

      {hidden ? '' : items}
      {hidden ? '' : <TrackListPagination pages={pages} currentPage={pageNum} setPage={setPageNum} deleteTrack={deleteTrack}/>}
    </>
  )
}

export default TrackList
