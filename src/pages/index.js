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
      return (
        <Layout>
          <SEO />

          <section>
            <div
              dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />
          </section>
        </Layout>
      )
    }}
  />
)
