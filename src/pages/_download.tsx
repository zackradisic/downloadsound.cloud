import React from 'react'
import { Link, PageProps } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import Columns from 'react-bulma-components/lib/components/columns'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'
import Downloader, { DownloadTypes } from '../components/downloader'

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
  return (
    <Layout>
      <SEO title={`Download SoundCloud ${activeTab.charAt(0).toUpperCase().concat(activeTab.slice(1)).concat('s')}`} />
      <Section style={{ backgroundColor: '#F8F8F8' }}>
        <Container>
          <Columns>

            <Columns.Column size={12} style={{ paddingBottom: '3rem' }}>
              <Downloader activeTab={activeTab} />
            </Columns.Column>

            <Columns.Column size={12}>
              <h1 style={{ color: '#4B4B4B', fontSize: '24px' }}>WHY US</h1>

              <p>Download SoundCloud tracks and playlists directly from SoundCloud to your machine in the MP3 format.
              We allow you to download SoundCloud audio straight from the source, meaning your privacy and security is safe.
              We are also the only site that allows entire SoundCloud playlists to be downloaded conveniently in a zip file.
              </p>
            </Columns.Column>

          </Columns>
        </Container>
      </Section>
    </Layout>
  )
}
