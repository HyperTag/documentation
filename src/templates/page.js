import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout/layout'

export default ({ data, pageContext }) => {
  const { markdownRemark } = data
  const { frontmatter } = markdownRemark

  return (
    <Layout>
      <SEO title={frontmatter.title} />

      <section>
        <h1>{frontmatter.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: pageContext.html }} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        path
        title
      }
    }
  }
`
