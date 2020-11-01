import axios from 'axios'
import JsZip from 'jszip'
import FileSaver from 'file-saver'
import { PlaylistTrack } from '../api'
import _Promise from 'bluebird'
import { Parser } from 'm3u8-parser'
import Crunker from 'crunker'

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
        FileSaver.saveAs(output.blob, filename)
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export const downloadPlaylist = async (title: string, tracks: PlaylistTrack[]) => {
  return downloadByGroup(5, ...tracks).then(downloaded => exportZip(title, ...downloaded))
}

const downloadPlaylistTrack = (track: PlaylistTrack) => {
  return fetch(track.url).then(resp => resp.blob()).then(blob => ({ blob, fileName: track.title } as DownloadedTrack))
}

interface M3U8Segment {
    uri: string
}

const downloadM3U8 = async (link: string) => {
  const audio = new Crunker()
  const parser = new Parser()
  const { data } = await axios.get(link)
  parser.push(data)
  parser.end()
  let buffers
  try {
    console.log(parser.manifest.segments.map(segment => segment.uri))
    buffers = await audio.fetchAudio(...parser.manifest.segments.map(segment => segment.uri))
  } catch (err) {
    console.log(err)
  }
  let concat
  try {
    concat = await audio.concatAudio(buffers)
  } catch (err) {
    console.log(err)
  }
  let output
  try {
    output = await audio.export(concat, 'audio/mp3')
  } catch (err) {
    console.log(err)
  }
  return output
}

const downloadByGroup = (concurrency = 10, ...tracks: PlaylistTrack[]) => {
  return _Promise.map(
    tracks,
    async (track: PlaylistTrack) => {
      if (track.hls) {
        console.log(track.url)
        const { blob } = await downloadM3U8(track.url)
        return {
          blob,
          fileName: `${track.title}.mp3`
        }
      }
      return await downloadPlaylistTrack(track)
    },
    { concurrency }
  )
}

const exportZip = (filename: string, ...tracks: DownloadedTrack[]) => {
  return new Promise((resolve, reject) => {
    const zip = JsZip()
    tracks.forEach((track, _) => {
      zip.file(`${track.fileName}.mp3`, track.blob)
    })
    zip.generateAsync({ type: 'blob' }).then(zipFile => {
      const fileName = `${filename}.zip`
      return resolve(FileSaver.saveAs(zipFile, fileName))
    })
      .catch(err => reject(err))
  })
}
