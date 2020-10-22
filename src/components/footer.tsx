import React from 'react'

import Columns from 'react-bulma-components/lib/components/columns'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'
import { Link } from 'gatsby'

const Footer = () => {
  const links = ['FAQ', 'ABOUT', 'CONTACT', 'PRIVACY POLICY'].map(link => <Columns.Column key={`link-${link}`}>
    <Link to={link.toLowerCase()}>{link}</Link>
  </Columns.Column>)
  return (
    <Section>
      <Container>
        <Columns>
          {links}

          <Columns.Column>
          © {new Date().getFullYear()} by @zackradisic
          </Columns.Column>

        </Columns>
      </Container>
    </Section>
  )
}

export default Footer
