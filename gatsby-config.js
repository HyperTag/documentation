const siteTitle = 'MetaRouter Documentation'

module.exports = {
  pathPrefix: '/gatsby-docs',
  siteMetadata: {
    title: siteTitle,
    description: `MetaRouter is a data engineering platform that that helps you collect, process, and route streaming data.`,
    author: `metarouter.io`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteTitle,
        short_name: `MetaRouter Docs`,
        start_url: `/`,
        background_color: `#ebf3fa`,
        theme_color: `#292d66`,
        display: `standalone`,
        icon: 'src/images/logo-light.png',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
