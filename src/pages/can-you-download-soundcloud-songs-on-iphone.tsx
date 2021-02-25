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
        title="Can You Download SoundCloud Songs on iPhone?"
        description="Use our online tool to Download SoundCloud songs on your iPhone, or any iOS device."
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
              Can You Download SoundCloud Songs on iPhone?
            </h1>
            <p>
              Yes, you can easily download SoundCloud songs from{' '}
              <a href="https://soundcloud.com">SoundCloud.com</a> to your iPhone
              with our online tool,{' '}
              <a href="https://downloadsound.cloud/">downloadsound.cloud</a>. In
              fact, you can download SoundCloud audio with any iOS device, not
              just an iPhone. Simply paste the URL of the SoundCloud
              track/playlist at{' '}
              <a href="https://downloadsound.cloud/">downloadsound.cloud</a>,
              and click &apos;<b>Download</b>&apos; once it is ready.
            </p>
            <br />

            <p>
              Our tool was developed with{' '}
              <a href="https://medium.com/@Vincentxia77/what-is-mobile-first-design-why-its-important-how-to-make-it-7d3cf2e29d00">
                Mobile First Design{' '}
              </a>
              , meaning it is completely optimized for iPhones, other iOS
              devices, and Android phones too.
            </p>
            <br />

            <h2
              style={{
                color: theme.containerTitle,
                fontSize: '24px',
                fontWeight: 600
              }}>
              How to Download SoundCloud Songs on Your iPhone
            </h2>
            <p>
              Downloading SoundCloud songs to your iPhone is extremely simple.
            </p>
            <Content className="is-size-6">
              <ol>
                <li>
                  Open your browser of choice and find a song from{' '}
                  <a href="https://soundcloud.com">SoundCloud.com</a>
                </li>
                <li>Select the URL at the top of the screen and copy it</li>
                <li>
                  Paste the URL at{' '}
                  <a href="https://downloadsound.cloud/track">
                    downloadsound.cloud/track
                  </a>
                </li>
                <li>
                  Once ready, click &apos;
                  <b style={{ color: theme.boldText }}>Download</b>&apos; and
                  the SoundCloud song will download to your iPhone.
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
              Because our tool is available on all web browsers, there is no
              need to waste any of your time downloading clunky apps from the
              iOS app store. All you need to do is open your web browser!
            </p>
            <br />
            <h2
              style={{
                color: theme.containerTitle,
                fontSize: '24px',
                fontWeight: 600
              }}>
              What iPhone version can I download SoundCloud songs with?
            </h2>
            <p>
              Since our site is an online tool, you can use any iPhone model to
              download SoundCloud songs. Pretty much any iPhone model from the
              iPhone 6 to the latest iPhone 12 Pro Max can download SoundCloud
              songs their respective web browsers.
            </p>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

export default PrivacyPolicy
