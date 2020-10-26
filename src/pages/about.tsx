import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Columns from 'react-bulma-components/lib/components/columns'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'
import Content from 'react-bulma-components/lib/components/content'

import { Link } from 'gatsby'

const About = () => {
  return (
    <Layout>
      <SEO></SEO>

      <Section style={{ backgroundColor: '#F8F8F8' }}>
        <Container>
          <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '5px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <h1>About</h1>
            <p> <Link to="/">downloadsound.cloud</Link> was created because available options for downloading SoundCloud
            tracks and playlists simply weren&apos;t good enough. There were a few problems we found with current sites:</p>

            <Content>
              <ul>
                <li><b>Certain tracks could not be downloaded</b> (some sites did not support tracks that were served via <a href="https://en.wikipedia.org/wiki/HTTP_Live_Streaming">HLS</a>)</li>
                <li><b>Playlists could not be downloaded conveniently</b> (you had to download each track of a playlist one-by-one)</li>
                <li><b>The sites were slow and ugly</b></li>
              </ul>
            </Content>

            <p>So, <Link to="/">downloadsound.cloud</Link> was designed specifically to improve upon these frustrations to be
            the best option for downloading SoundCloud tracks and playlists. We made sure that we focused on those three
            lacking areas to create the best user experience. In the end, we made three great choices: </p>

            <Content>
              <ul>
                <li><b>Nearly all SoundCloud tracks/playlists can be downloaded</b> (except for those SoundCloud prohibits for copyright reasons)</li>
                <li><b>Entire playlists can be downloaded into a zip file</b></li>
                <li><b>Our site is fast and sleek</b></li>
              </ul>
            </Content>

            <p>Hopefully we have created the best user experience for downloading SoundCloud audio, and we are constantly
                seeking for improvement. If you feel there is an area/aspect of the site that could be made better, do not
                hesitate to <Link to="/contact">contact</Link> us.</p>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

export default About
