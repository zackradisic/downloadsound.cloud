import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import Columns from 'react-bulma-components/lib/components/columns'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'
import Downloader, { DownloadTypes } from '../components/downloader'

import './style.css'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Section>
      <Container>
        <Columns>

          <Columns.Column size={12}>
            <Downloader activeTab={DownloadTypes.Track}/>
          </Columns.Column>

        </Columns>
      </Container>
    </Section>
  </Layout>
)

export default IndexPage
