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
      <SEO title="How to download SoundCloud likes"
        description="It's easy to download your liked music from SoundCloud with our tool." />

      <Section style={{ backgroundColor: theme.sky }}>
        <Container>
          <div style={{ color: theme.containerText, backgroundColor: theme.containerBackground, padding: '1rem', borderRadius: '5px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <h1 style={{ color: theme.containerTitle, fontSize: '24px', fontWeight: 600 }}>How do I download SoundCloud likes?</h1>
            <p>
                Using our tool, it&apos;s extremely simple to download all of your liked music from SoundCloud.
                In fact, we allow you to download the likes of any user from SoundCloud, all you need is the profile URL of that user.
                Once you have the URL, go to <a href="https://downloadsound.cloud/likes">downloadsound.cloud/likes</a>, paste the URL,
                and hit &apos;<b>Download</b>&apos;.
                All of your liked tracks will begin downloading as a ZIP file to your computer!
            </p>
            <br />

            <h2 style={{ color: theme.containerTitle, fontSize: '24px', fontWeight: 600 }}>Steps to Download Your Likes from SoundCloud</h2>
            <p>Follow these instructions to download all of your beloved likes from SoundCloud!</p>
            <Content className="is-size-6">
              <ol>
                <li>Copy the URL of your profile from<a href="https://soundcloud.com">SoundCloud.com</a></li>
                <li>Paste the profile URL at <a href="https://downloadsound.cloud/likes">downloadsound.cloud/likes</a></li>
                <li>The download process will begin once you click the &apos;<b style={{ color: theme.boldText }}>Download</b>&apos; button.</li>
              </ol>
            </Content>

            <p>
                You may also view all the tracks you are about to download and remove any unwanted songs with the track list viewer,
                located directly below the download button.
            </p>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

export default PrivacyPolicy
