import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Columns from 'react-bulma-components/lib/components/columns'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'
import Content from 'react-bulma-components/lib/components/content'

import './style.css'
import useTheme from '../hooks/theme'

const PrivacyPolicy = () => {
  const theme = useTheme()
  return (
    <Layout>
      <SEO
        title="How to download SoundCloud playlists as ZIP"
        description="Downloading SoundCloud playlists as ZIP/MP3 is extremely easy with our tool."
      />

      <Section style={{ backgroundColor: theme.sky }}>
        <Container>
          <div
            style={{
              color: theme.containerText,
              backgroundColor: theme.containerBackground,
              padding: '1rem',
              borderRadius: '5px',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}>
            <h1
              style={{
                color: theme.containerTitle,
                fontSize: '24px',
                fontWeight: 600
              }}>
              How to download SoundCloud playlists?
            </h1>
            <p>
              To download a SoundCloud playlist to your computer you will first
              need the URL of the SoundCloud playlist. Navigate to
              SoundCloud.com and find your playlist and copy the URL. If your
              playlist is private make sure to copy its secret share link. Then
              you can navigate to{' '}
              <a href="https://downloadsound.cloud/playlist">
                downloadsound.cloud/playlist
              </a>
              , enter the URL in the input bar, and click &apos;<b>Download</b>
              &apos;. The SoundCloud playlist will now download to your
              computer/iPhone/Android as a collection of MP3 files.
            </p>
            <br />

            <h2
              style={{
                color: theme.containerTitle,
                fontSize: '24px',
                fontWeight: 600
              }}>
              Steps to Download SoundCloud Playlists as MP3/ZIP for Free
            </h2>
            <p>
              These are the steps on how to download SoundCloud playlists to a
              single zip file on your computer, iPhone, or Android device.
            </p>
            <Content className="is-size-6">
              <ol>
                <li>
                  Copy the URL of the playlist from{' '}
                  <a href="https://soundcloud.com">SoundCloud.com</a>
                </li>
                <li>
                  Paste the URL of the playlist into the &apos;
                  <b style={{ color: theme.boldText }}>Playlist</b>&apos; input
                  bar at{' '}
                  <a href="https://downloadsound.cloud/playlist">
                    downloadsound.cloud/playlist
                  </a>
                </li>
                <li>
                  Click the &apos;
                  <b style={{ color: theme.boldText }}>Download</b>&apos; button
                  to save the playlist as a ZIP file on your computer, iPhone,
                  or Android device.
                </li>
              </ol>
            </Content>

            <p>
              You may also view the tracks of the playlist and remove any
              unwanted songs before downloading the playlist with the track list
              viewer, located directly below the download button.
            </p>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

export default PrivacyPolicy
