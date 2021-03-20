/* eslint-disable indent */ // Weird prettier error occurs, sorry
import React, { useEffect, useRef, useState } from 'react'
import { Link, PageProps } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import Columns from 'react-bulma-components/lib/components/columns'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'
import Downloader, { DownloadTypes } from '../components/downloader'
import Content from 'react-bulma-components/lib/components/content'

import { useQueryParam, StringParam } from 'use-query-params'

import { WindowLocation } from '@reach/router'

import './style.css'
import useTheme from '../hooks/theme'
import { getActiveUserData, isActive } from '../lib/active-user'
import FrequentUserBanner from '../components/FrequentUserBanner'
import FAQ from '../components/faq'

export interface DownloadState {
  initialText: string
}

interface DownloadPageProps {
  activeTab: DownloadTypes
  location?: WindowLocation<DownloadState>
}

// eslint-disable-next-line no-undef
const getContent = (
  activeTab: DownloadTypes
): [string, string, string, JSX.Element[], JSX.Element] => {
  const theme = useTheme()
  let title = ''
  let desc = ''
  let howTitle = ''
  const steps = []
  let tutorial = <></>
  switch (activeTab) {
    case DownloadTypes.Playlist:
      title = 'Download entire SoundCloud playlists to ZIP file'
      desc =
        'Download playlists into a single ZIP file with the click of a button.'
      howTitle = 'How can I download entire SoundCloud playlists to ZIP?'
      steps.push(
        <li>
          Get the URL of the playlist from{' '}
          <a href="https://soundcloud.com">https://soundcloud.com</a> (if
          it&apos;s private make sure you copy the secret share link)
        </li>,
        <li>In the input above, paste the URL.</li>,
        <li>
          Press &apos;<b style={{ color: theme.boldText }}>Download</b>&apos;
        </li>,
        <li>
          You can click &apos;
          <b style={{ color: theme.boldText }}>Open track list</b>&apos; and
          review the tracks or remove unwanted ones.
        </li>,
        <li>
          Press &apos;<b style={{ color: theme.boldText }}>Download</b>&apos;
          again, and your playlist will begin downloading as a ZIP file
        </li>
      )
      tutorial = (
        <p>
          Read our <a href="how-to-download-soundcloud-playlist">tutorial</a>{' '}
          for more information.
        </p>
      )
      break
    case DownloadTypes.Track:
      title = 'Download SoundCloud Tracks to MP3'
      desc =
        'Download your favorite SoundCloud tracks to MP3 files with one click.'
      howTitle = 'How do I download tracks from SoundCloud?'
      steps.push(
        <li>
          Find and copy the URL of the track from{' '}
          <a href="https://soundcloud.com">https://soundcloud.com</a>
        </li>,
        <li>
          Paste the URL of the track in the input bar in the &apos;
          <b style={{ color: theme.boldText }}>Track</b>&apos; tab
        </li>,
        <li>
          Click the &apos;<b style={{ color: theme.boldText }}>Download</b>
          &apos; button
        </li>
      )
      tutorial = (
        <p>
          Need help? See the downloading tracks{' '}
          <a href="how-to-download-soundcloud-tracks">tutorial</a> for more
          guidance.
        </p>
      )
      break
    case DownloadTypes.Likes:
      title = 'Download all of your SoundCloud likes'
      desc = 'Download all of your liked SoundCloud music with one click.'
      howTitle = 'How do I download all of my SoundCloud likes?'
      steps.push(
        <li>
          Copy any profile URL from{' '}
          <a href="https://soundcloud.com">https://soundcloud.com</a>
        </li>,
        <li>Paste that same URL above.</li>,
        <li>
          Hit the &apos;<b style={{ color: theme.boldText }}>Download</b>&apos;
          button
        </li>,
        <li>
          If you want to look at the tracks, or remove some, press &apos;
          <b style={{ color: theme.boldText }}>Open track list</b>&apos;
        </li>,
        <li>
          When you are ready, click &apos;
          <b style={{ color: theme.boldText }}>Download</b>&apos; and all of the
          likes will start downloading to a ZIP file on your computer.
        </li>
      )
      tutorial = (
        <p>
          If you&apos;re stuck, visit the downloading likes{' '}
          <a href="how-to-download-soundcloud-likes">tutorial</a> for more help.
        </p>
      )
      break
  }

  return [title, desc, howTitle, steps, tutorial]
}

export const DownloadPage = ({ activeTab }: DownloadPageProps) => {
  const theme = useTheme()
  console.log(!!(getActiveUserData()?.downloads > 3))
  const [title, desc, howTitle, steps, tutorial] = getContent(activeTab)
  const [showFrequentBanner, setShowFrequentBanner] = useState<boolean>(
    isActive(getActiveUserData())
  )

  const [rand, setRand] = useState<number>(Math.round(Math.random()))

  useEffect(() => {
    // For some reason Gatsby is not properly updating the href of the <a> tag,
    // I suspect it's some SSG problem. This is a hacky solution for now.
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms))
    const change = async () => {
      await delay(100)

      setRand(Math.round(Math.random()))
    }
    change()
  }, [])
  return (
    <>
      <Layout>
        <SEO title={title} description={desc} />
        {showFrequentBanner ? (
          <FrequentUserBanner close={setShowFrequentBanner} />
        ) : (
          ''
        )}
        <Section style={{ backgroundColor: theme.sky }}>
          <Container>
            <Columns>
              <Columns.Column size={12}>
                <Downloader activeTab={activeTab} />
              </Columns.Column>

              <Columns.Column size={6} className="is-3">
                <div
                  style={{
                    color: theme.containerText,
                    backgroundColor: theme.containerBackground,
                    padding: '1.5rem 2.5rem',
                    borderRadius: '10px',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                  }}>
                  <h1
                    style={{
                      color: theme.containerTitle,
                      fontSize: '24px',
                      fontWeight: 600
                    }}>
                    {howTitle}
                  </h1>
                  <Content className="is-size-6">
                    <ol>{steps}</ol>
                  </Content>
                  {tutorial}
                </div>
              </Columns.Column>

              <Columns.Column size={6} className="is-3">
                {rand ? (
                  <div
                    style={{
                      color: theme.containerText,
                      backgroundColor: theme.containerBackground,
                      padding: '1.5rem 2.5rem',
                      borderRadius: '10px',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}>
                    <h1
                      style={{
                        color: theme.containerTitle,
                        fontSize: '24px',
                        fontWeight: 600
                      }}>
                      Browser Extension
                    </h1>

                    <p className="is-size-6" style={{ marginTop: '1rem' }}>
                      Want to download SoundCloud tracks and playlists while
                      browsing soundcloud.com?
                    </p>

                    <p className="is-size-6" style={{ marginTop: '1rem' }}>
                      <a
                        onClick={(
                          e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                        ) => {
                          e.preventDefault()
                          window.location.replace(
                            'https://chrome.google.com/webstore/detail/downloadsoundcloud/bafobcnpeegipbakjfbffjkokofkncip?hl=en&authuser=0'
                          )
                        }}
                        href="https://chrome.google.com/webstore/detail/downloadsoundcloud/bafobcnpeegipbakjfbffjkokofkncip?hl=en&authuser=0">
                        Get our browser extension
                      </a>
                      , which adds a download button to SoundCloud.
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      color: theme.containerText,
                      backgroundColor: theme.containerBackground,
                      padding: '1.5rem 2.5rem',
                      borderRadius: '10px',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}>
                    <h1
                      style={{
                        color: theme.containerTitle,
                        fontSize: '24px',
                        fontWeight: 600
                      }}>
                      Join our Discord
                    </h1>

                    <p className="is-size-6" style={{ marginTop: '1rem' }}>
                      Want to hang out and talk? Or do you need help with
                      something? We&apos;re trying to build a community of music
                      lovers!
                    </p>

                    <p className="is-size-6" style={{ marginTop: '1rem' }}>
                      Hop on our{' '}
                      <a
                        onClick={(
                          e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                        ) => {
                          e.preventDefault()
                          window.location.replace(
                            'https://discord.com/invite/39bEkYuzrN'
                          )
                        }}
                        href="https://app.downloadsound.cloud">
                        Discord
                      </a>{' '}
                      server and chat with us!
                    </p>
                  </div>
                )}
              </Columns.Column>

              <Columns.Column size={12}>
                <FAQ activeTab={activeTab} />
              </Columns.Column>
            </Columns>
          </Container>
        </Section>
      </Layout>
    </>
  )
}
