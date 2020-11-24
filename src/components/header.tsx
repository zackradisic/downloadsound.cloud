import { Link } from 'gatsby'
import React from 'react'

import Columns from 'react-bulma-components/lib/components/columns'
import Section from 'react-bulma-components/lib/components/section'
import Hero from 'react-bulma-components/lib/components/hero'
import Container from 'react-bulma-components/lib/components/container'
import Heading from 'react-bulma-components/lib/components/heading'

const Header = () => {
  return (
    <Hero style={{ backgroundColor: '#ffe4cc' }}>
      <Hero.Body>
        <Container className="has-text-centered">
          <Heading style={{ letterSpacing: '0.225em', color: '#000000', paddingBottom: '3.25rem', paddingTop: '3rem' }}>
            <Link className="site-title is-size-1 is-size-3-mobile" to="/">
              downloadsound.cloud
            </Link>
          </Heading>

          <Heading subtitle size={5} renderAs="h2" style={{ color: '#3C3B3B' }}>
          Easily Download SoundCloud tracks and playlists to MP3
          </Heading>
        </Container>
      </Hero.Body>
    </Hero>
  )
}

export default Header
