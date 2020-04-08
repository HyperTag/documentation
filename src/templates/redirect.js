// this template handles markdown files that contain a redirectTo field in their frontmatter

import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/seo'

export default ({ data }) => {
  const { redirectTo } = data.markdownRemark.frontmatter
  const meta = [
    {
      'http-equiv': 'refresh',
      content: `0;url=${redirectTo}`,
    },
  ]
  const link = [
    {
      rel: 'canonical',
      href: redirectTo,
    },
  ]

  return (
    <div style={{ padding: '2rem' }}>
      <SEO meta={meta} link={link} />
      <p>Redirecting....</p>
      <p>
        <a href={redirectTo}>Click here to be redirected if the page does not reload on its own.</a>
      </p>
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        path
        redirectTo
      }
    }
  }
`
