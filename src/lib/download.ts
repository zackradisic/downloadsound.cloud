import axios from 'axios'
import JsZip from 'jszip'
import FileSaver from 'file-saver'
import { PlaylistTrack } from '../api'
import _Promise from 'bluebird'
import { Parser } from 'm3u8-parser'
import React from 'react'
interface DownloadedTrack {
  blob: Blob
  fileName: string
}

type ID3Tag = any

const fetchWasm = async (): Promise<ID3Tag> => {
  if (typeof window !== 'undefined') {
    const { getWasm } = require('./getWasm')
    const wasm = await getWasm()
    const id3 = wasm.ID3Tag.new()
    return id3
  }
}
const generateId3Tag = async (
  id3: ID3Tag,
  title: string,
  author: string,
  imageUrl: string
) => {
  const response = await fetch(imageUrl)
  const imageData = await response.arrayBuffer()
  return id3.create_tag(new Uint8Array(imageData), title, author)
}

export const downloadFile = async (
  link: string,
  filename: string,
  author: string,
  imageURL: string
) => {
  if (typeof window !== 'undefined') {
    if (!link.includes('.m3u8')) {
      const resp = await fetch(link)

      const songBuff = await resp.arrayBuffer()
      const id3 = await fetchWasm()
      const tag = await generateId3Tag(id3, filename, author, imageURL)

      const URL = window.URL || window.webkitURL
      const url = URL.createObjectURL(new Blob([tag, new Uint8Array(songBuff)]))
      const a = document.createElement('a')

      a.style.display = 'none'
      a.href = url
      // the filename you want
      a.download = filename + '.mp3'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } else {
      try {
        const output = await downloadM3U8(link)
        FileSaver.saveAs(output, filename + '.mp3')
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export const downloadPlaylist = async (
  title: string,
  tracks: PlaylistTrack[],
  setProgress?: React.Dispatch<React.SetStateAction<number>>
) => {
  return downloadByGroup(setProgress, 5, ...tracks).then((downloaded) =>
    exportZip(title, ...downloaded)
  )
}

const downloadPlaylistTrack = (track: PlaylistTrack) => {
  return fetch(track.url)
    .then((resp) => resp.blob())
    .then((blob) => ({ blob, fileName: track.title } as DownloadedTrack))
}

interface M3U8Segment {
  uri: string
}

const downloadM3U8 = async (link: string) => {
  const parser = new Parser()
  const { data } = await axios.get(link)
  parser.push(data)
  parser.end()
  const urls = parser.manifest.segments.map((segment) => segment.uri)
  const promises = urls.map(async (url) => {
    const res = await axios.get(url, {
      responseType: 'blob',
      headers: {
        Accept: 'audio/mpeg'
      }
    })
    return res.data
  })
  const buffers: any = await Promise.all(promises)
  return new Blob(buffers)
}

const downloadByGroup = async (
  setProgress: React.Dispatch<React.SetStateAction<number>> | undefined,
  concurrency = 10,
  ...tracks: PlaylistTrack[]
) => {
  const id3 = await fetchWasm()
  let count = 0
  return _Promise.map(
    tracks,
    async (track: PlaylistTrack) => {
      const tag = await generateId3Tag(
        id3,
        track.title,
        track.author,
        track.imageURL
      )
      if (track.hls) {
        const blob = await downloadM3U8(track.url)
        count++
        if (setProgress) {
          setProgress(count / tracks.length)
        }
        return {
          blob: new Blob([tag, blob]),
          fileName: `${track.title}.mp3`
        }
      }
      const t = await downloadPlaylistTrack(track)
      t.blob = new Blob([tag, t.blob])
      count++
      setProgress(count / tracks.length)
      return t
    },
    { concurrency }
  )
}

const exportZip = (filename: string, ...tracks: DownloadedTrack[]) => {
  if (typeof window !== 'undefined') {
    return new Promise((resolve, reject) => {
      const zip = JsZip()
      tracks.forEach((track, _) => {
        const trackName = window.navigator.platform.includes('Mac')
          ? `${track.fileName.replace('/', ':')}.mp3`
          : `${track.fileName.replace('/', '∕')}.mp3`
        zip.file(trackName, track.blob, {
          createFolders: false
        })
      })
      zip
        .generateAsync({ type: 'blob' })
        .then((zipFile) => {
          const fileName = `${filename}.zip`
          return resolve(FileSaver.saveAs(zipFile, fileName))
        })
        .catch((err) => reject(err))
    })
  }
}
