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
        title="Download SoundCloud for Mac"
        description="Downloading SoundCloud audio for Mac is extremely fast with our online tool."
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
              Download SoundCloud for Mac
            </h1>
            <p>
              Downloading SoundCloud tracks and playlists is extremely fast and
              simple with our online tool. On your mac, go to SoundCloud.com and
              copy the URL of your desired playlist. With the URL copied onto
              your clip board, go to{' '}
              <a href="https://downloadsound.cloud/playlist">
                downloadsound.cloud/playlist
              </a>
              , paste the URL and click &apos;<b>Download</b>&apos;. The
              SoundCloud track/playlist will now begin downloading to your Mac.
            </p>
            <br />

            <p>
              Make sure that the URL you have copied is valid. If it is a
              private track or playlist, make sure to copy the secret share
              link. Our site is optimized for use in Safari, the default browser
              for MacOS. You can use any browser on your Macintosh device to
              download SoundCloud audio.
            </p>
            <br />

            <h2
              style={{
                color: theme.containerTitle,
                fontSize: '24px',
                fontWeight: 600
              }}>
              Steps for Downloading SoundCloud Audio to Your Mac Device
            </h2>
            <p>
              Below are the detailed instructions for downloading SoundCloud
              audio to your MacBook Pro, MacBook Air, or iMac.
            </p>
            <Content className="is-size-6">
              <ol>
                <li>
                  Find your desired song or playlist from{' '}
                  <a href="https://soundcloud.com">SoundCloud.com</a>{' '}
                </li>
                <li>Copy the URL of the track or playlist</li>
                <li>
                  Paste the URL of the track or playlist at{' '}
                  <a href="https://downloadsound.cloud/track">
                    downloadsound.cloud/track
                  </a>{' '}
                  or{' '}
                  <a href="https://downloadsound.cloud/playlist">
                    downloadsound.cloud/playlist
                  </a>
                </li>
                <li>
                  Press &apos;<b style={{ color: theme.boldText }}>Download</b>
                  &apos; to start the download process to your Mac device.
                </li>
              </ol>
            </Content>

            <p>
              You may also view the tracks of the playlist and remove any
              unwanted songs before downloading the playlist with the track list
              viewer, located directly below the download button.
            </p>

            <br />
            <p>
              Our tool is 100% accessible online on your browser, so there is no
              need to waste your time downloading an app from the Mac App Store.
              Once again, this site is optimized for use with MacOS, in fact, it
              was developed on a MacBook Pro 16 inch 2019 model.
            </p>
            <br />
            <h2
              style={{
                color: theme.containerTitle,
                fontSize: '24px',
                fontWeight: 600
              }}>
              Mac Support
            </h2>
            <p>
              Our site allows any MacOS machine to download SoundCloud audio.
              This means that your MacBook Pro (13&quot; and 16&quot; editions),
              MacBook Air, iMac, iMac Pro, Mac Pro are capable of downloading
              songs from SoundCloud. Additionally, we also support all iOS
              devices.
            </p>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

export default PrivacyPolicy
