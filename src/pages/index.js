import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from './../components/layout'
import SEO from './../components/seo'

const query = graphql`
  {
    markdownRemark(frontmatter: { path: { eq: "/" } }) {
      html
      frontmatter {
        title
      }
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
          <SEO title={frontmatter.title} />

          <section>
            <h1>{frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </section>
        </Layout>
      )
    }}
  />
)
