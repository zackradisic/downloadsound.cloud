import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Section style={{ backgroundColor: '#F8F8F8' }}>
      <Container>
        <h1>404: Not Found</h1>
        <p>Sorry, we could not find that page.</p>
      </Container>
    </Section>
  </Layout>
)

export default NotFoundPage
