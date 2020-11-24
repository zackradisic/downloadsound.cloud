import React from 'react'
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

export interface DownloadState {
  initialText: string
}

interface DownloadPageProps {
    activeTab: DownloadTypes,
    location?: WindowLocation<DownloadState>
}

export const DownloadPage = ({ activeTab }: DownloadPageProps) => {
  const title = activeTab === DownloadTypes.Track ? 'Download SoundCloud tracks to MP3 easily' : 'Download entire SoundCloud playlists to ZIP file'

  return (
    <>
      <Layout>
        <SEO
          title={title}
          description="Download tracks and playlists from SoundCloud with the click of a button. Entire playlists can be downloaded into a ZIP file."/>
        <Section style={{ backgroundColor: '#ffe4cc' }}>
          <Container>
            <Columns>

              <Columns.Column size={12}>
                <Downloader activeTab={activeTab} />
              </Columns.Column>

              <Columns.Column size={6} className="is-3">
                <div style={{ backgroundColor: 'white', padding: '1.5rem 2.5rem', borderRadius: '10px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                  <h1 style={{ color: '#4B4B4B', fontSize: '24px', fontWeight: 600 }}>Information</h1>

                  <p className="is-size-6" style={{ marginTop: '1rem' }}>Download SoundCloud tracks and playlists directly from SoundCloud to your computer in the MP3 format.
              We allow you to download SoundCloud audio straight from the source, meaning your privacy and security is safe.
              All you need is the URL of the SoundCloud track/playlist, and we will take care of the rest.
              We are also the only site that allows entire SoundCloud playlists to be downloaded conveniently in a zip file.
                  </p>
                  <br />
                  <p>
                Make sure to <b>bookmark</b> the site if you find it helpful with saving SoundCloud playlists and tracks for offline use.
                  </p>
                </div>
              </Columns.Column>

              <Columns.Column size={6} className="is-3">
                <div style={{ backgroundColor: 'white', padding: '1.5rem 2.5rem', borderRadius: '10px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                  <h1 style={{ color: '#4B4B4B', fontSize: '24px', fontWeight: 600 }}>How do I use this?</h1>
                  <Content className="is-size-6">
                    <ol>
                      <li>Copy the URL of the track or playlist from <a href="https://soundcloud.com">https://soundcloud.com</a></li>
                      <li>Paste the URL of the track in the input bar in the &apos;<b>Track</b>&apos; or &apos;<b>Playlist</b>&apos; tab</li>
                      <li>Click the &apos;<b>Download</b>&apos; button</li>
                    </ol>
                  </Content>
                </div>
              </Columns.Column>

            </Columns>
          </Container>
        </Section>
      </Layout>
    </>
  )
}
