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
        title="How to download SoundCloud tracks"
        description="It's easy to download your favorite songs from SoundCloud with our tool."
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
              How do I download SoundCloud tracks?
            </h1>
            <p>
              You can easily download songs from SoundCloud using our tool. All
              you need is the URL of the track! Paste the URL at{' '}
              <a href="https://downloadsound.cloud/track">
                downloadsound.cloud/track
              </a>{' '}
              and hit &apos;<b>Download</b>&apos;. The track will begin
              downloading as an MP3 file!
            </p>
            <br />

            <h2
              style={{
                color: theme.containerTitle,
                fontSize: '24px',
                fontWeight: 600
              }}>
              Steps to Download Tracks from SoundCloud
            </h2>
            <p>
              Here is a step-by-step guide on how to download tracks from
              SoundCloud
            </p>
            <Content className="is-size-6">
              <ol>
                <li>
                  Copy the URL of the track from{' '}
                  <a href="https://soundcloud.com">SoundCloud.com</a>
                </li>
                <li>
                  Paste that same URL over at{' '}
                  <a href="https://downloadsound.cloud/track">
                    downloadsound.cloud/track
                  </a>
                </li>
                <li>
                  Click the &apos;
                  <b style={{ color: theme.boldText }}>Download</b>&apos; button
                  and the download process will begin!
                </li>
              </ol>
            </Content>

            <p>
              If you have any questions, suggestions, or concerns please visit
              our <a href="/contact">Contact</a> page for instructions on how to
              get help! <br />
              <br />
              We are always eager to help and improve the site.
            </p>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

export default PrivacyPolicy
