import React from 'react'

import Columns from 'react-bulma-components/lib/components/columns'
import Footer from 'react-bulma-components/lib/components/footer'
import Hero from 'react-bulma-components/lib/components/hero'
import Container from 'react-bulma-components/lib/components/container'
import { Link } from 'gatsby'
import useTheme from '../hooks/theme'

const _Footer = () => {
  const theme = useTheme()
  const links = ['ABOUT', 'CONTACT', 'PRIVACY POLICY'].map((link) => (
    <Columns.Column key={`link-${link}`}>
      <Link to={'/' + link.toLowerCase().replace(' ', '-')}>{link}</Link>
    </Columns.Column>
  ))
  return (
    <Hero className="z-index-1000">
      <Hero.Footer style={{ backgroundColor: theme.containerBackground }}>
        <Footer>
          <Container>
            <Columns>
              {links}

              <Columns.Column style={{ color: 'rgb(172, 172, 172)' }}>
                Made with ❤️ by{' '}
                <Link to="https://twitter.com/zackinsomnia">@zackinsomnia</Link>
              </Columns.Column>
            </Columns>
          </Container>
        </Footer>
      </Hero.Footer>
    </Hero>
  )
}

export default _Footer
