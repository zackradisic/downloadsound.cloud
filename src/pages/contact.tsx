import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Columns from 'react-bulma-components/lib/components/columns'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'

import './style.alt.css'
import useTheme from '../hooks/theme'

const Contact = () => {
  const theme = useTheme()
  return (
    <Layout>
      <SEO title="downloadsound.cloud - Contact"></SEO>

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
              Contact
            </h1>
            <p>
              If you are in need of help or have any suggestions/concerns, you
              can reach us at:{' '}
              <a href="mailto:contact@downloadsound.cloud">
                contact@downloadsound.cloud
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

export default Contact
