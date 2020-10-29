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
  const description = activeTab === DownloadTypes.Track ? 'downloadsound.cloud is the best tool for downloading SoundCloud tracks.' : 'downloadsound.cloud is the only site that allows you to download playlists as a ZIP file.'

  return (
    <Layout>
      <SEO
        title={title}
        description={description} />
      <Section style={{ backgroundColor: '#F8F8F8' }}>
        <Container>
          <Columns>

            <Columns.Column size={12} style={{ paddingBottom: '3rem' }}>
              <Downloader activeTab={activeTab} />
            </Columns.Column>

            <Columns.Column size={12}>
              <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '5px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <h1 style={{ color: '#4B4B4B', fontSize: '24px' }}>HOW TO USE</h1>
                <Content>
                  <ol>
                    <li>Copy the URL of the track or playlist from <a href="https://soundcloud.com">https://soundcloud.com</a></li>
                    <li>Paste the URL of the track in the input bar in the &apos;<b>Track</b>&apos; or &apos;<b>Playlist</b>&apos; tab</li>
                    <li>Click the &apos;<b>Download</b>&apos; button</li>
                  </ol>
                </Content>
              </div>
            </Columns.Column>

            <Columns.Column size={12} style={{ marginTop: '3rem' }}>
              <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '5px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <h1 style={{ color: '#4B4B4B', fontSize: '24px' }}>INFO</h1>

                <p>Download SoundCloud tracks and playlists directly from SoundCloud to your computer in the MP3 format.
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

          </Columns>
        </Container>
      </Section>
    </Layout>
  )
}
