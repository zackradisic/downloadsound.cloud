import axios from 'axios'
import JsZip from 'jszip'
import FileSaver from 'file-saver'
import { PlaylistTrack } from '../api'
import _Promise from 'bluebird'
import { Parser } from 'm3u8-parser'
import React from 'react'

interface DownloadedTrack {
    blob: Blob,
    fileName: string,

}

export const downloadFile = async (link: string, filename: string) => {
  if (typeof window !== 'undefined') {
    if (!link.includes('.m3u8')) {
      fetch(link)
        .then(resp => resp.blob())
        .then(blob => {
          const URL = window.URL || window.webkitURL
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          // the filename you want
          a.download = filename + '.mp3'
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
        })
        .catch(err => console.log(err))
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

export const downloadPlaylist = async (title: string, tracks: PlaylistTrack[], setProgress?: React.Dispatch<React.SetStateAction<number>>) => {
  return downloadByGroup(setProgress, 5, ...tracks).then(downloaded => exportZip(title, ...downloaded))
}

const downloadPlaylistTrack = (track: PlaylistTrack) => {
  return fetch(track.url).then(resp => resp.blob()).then(blob => ({ blob, fileName: track.title } as DownloadedTrack))
}

interface M3U8Segment {
    uri: string
}

const downloadM3U8 = async (link: string) => {
  const parser = new Parser()
  const { data } = await axios.get(link)
  parser.push(data)
  parser.end()
  const urls = parser.manifest.segments.map(segment => segment.uri)
  const promises = urls.map(async url => {
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

const downloadByGroup = (setProgress: React.Dispatch<React.SetStateAction<number>> | undefined, concurrency = 10, ...tracks: PlaylistTrack[]) => {
  let count = 0
  return _Promise.map(
    tracks,
    async (track: PlaylistTrack) => {
      if (track.hls) {
        const blob = await downloadM3U8(track.url)
        console.log(setProgress)
        count++
        if (setProgress) {
          setProgress(count / tracks.length)
        }
        return {
          blob,
          fileName: `${track.title}.mp3`
        }
      }
      const t = await downloadPlaylistTrack(track)
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
        const trackName = window.navigator.platform.includes('Mac') ? `${track.fileName.replace('/', ':')}.mp3` : `${track.fileName.replace('/', '∕')}.mp3`
        zip.file(trackName, track.blob, {
          createFolders: false
        })
      })
      zip.generateAsync({ type: 'blob' }).then(zipFile => {
        const fileName = `${filename}.zip`
        return resolve(FileSaver.saveAs(zipFile, fileName))
      })
        .catch(err => reject(err))
    })
  }
}
