const siteTitle = 'MetaRouter Documentation'

module.exports = {
  pathPrefix: '/docs-gatsby',
  siteMetadata: {
    title: siteTitle,
    description: `MetaRouter is a data engineering platform that that helps you collect, process, and route streaming data.`,
    author: `metarouter.io`,
    siteUrl: `https://metarouter.io/docs`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-headers`, `gatsby-remark-prismjs`],
      },
    },
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
    `gatsby-plugin-offline`,
  ],
}
