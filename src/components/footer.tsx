import React from 'react'

import Columns from 'react-bulma-components/lib/components/columns'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'
import { Link } from 'gatsby'

const Footer = () => {
  const links = ['ABOUT', 'CONTACT', 'PRIVACY POLICY'].map(link => <Columns.Column key={`link-${link}`}>
    <Link to={'/' + link.toLowerCase().replace(' ', '-')}>{link}</Link>
  </Columns.Column>)
  return (
    <Section>
      <Container>
        <Columns>
          {links}

          <Columns.Column>
          © {new Date().getFullYear()} by <a href="https://github.com/zackradisic">@zackradisic</a>
          </Columns.Column>

        </Columns>
      </Container>
    </Section>
  )
}

export default Footer
