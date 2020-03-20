import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from './../components/layout/layout'
import SEO from './../components/seo'

const query = graphql`
  {
    markdownRemark(frontmatter: { path: { eq: "/" } }) {
      html
    }
  }
`

export default () => (
  <StaticQuery
    query={query}
    render={data => {
      const { markdownRemark } = data
      const { frontmatter, html } = markdownRemark

      return (
        <Layout>
          <SEO />

          <section>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </section>
        </Layout>
      )
    }}
  />
)
