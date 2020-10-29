module.exports = {
  siteMetadata: {
    title: 'downloadsound.cloud',
    description: 'Download tracks, songs, and playlists from soundcloud.com',
    author: '@zackradisic',
    siteUrl: 'https://downloadsound.cloud'
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-use-query-params',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: ['./src']
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/downloadsound.cloud.png' // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
