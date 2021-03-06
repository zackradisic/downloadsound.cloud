/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import DownloadSoundCloudImg from '../images/downloadsound.cloud-og.png'

// eslint-disable-next-line prettier/prettier
function SEO ({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  useEffect(() => {
    const tawkto = document.createElement('script')
    tawkto.type = 'text/javascript'
    tawkto.innerHTML = `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/601c99b7a9a34e36b973fd84/1etnrgtv3';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      })();
    `
    const skimlink = document.createElement('script')
    skimlink.type = 'text/javascript'
    skimlink.src = 'https://s.skimresources.com/js/186745X1657275.skimlinks.js'
    const adsense = document.createElement('script')
    adsense.setAttribute('data-ad-client', 'ca-pub-9784217227745416')
    adsense.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    adsense.async = true
    document.head.appendChild(tawkto)
    document.body.appendChild(skimlink)
    document.body.appendChild(adsense)
  }, [])

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      meta={[
        {
          name: 'description',
          content: metaDescription
        },
        {
          property: 'og:title',
          content: title
        },
        {
          property: 'og:description',
          content: metaDescription
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:site',
          content: '@zackinsomnia'
        },
        {
          name: 'twitter:title',
          content: title
        },
        {
          name: 'twitter:description',
          content: metaDescription
        },
        {
          name: 'twitter:image',
          content: DownloadSoundCloudImg
        },
        {
          property: 'og:image',
          content: DownloadSoundCloudImg
        }
      ].concat(meta)}></Helmet>
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  description: ''
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
}

export default SEO
