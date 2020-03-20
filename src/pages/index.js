import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'

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
            <ul class="cards">
              <li>
                <Link to="/enterprise-edition/">MetaRouter Enterprise</Link>
              </li>
              <li>
                <Link to="/enterprise-destinations/">
                  Enterprise Destinations
                </Link>
              </li>
              <li>
                <Link to="/cloud-edition/">MetaRouter Cloud</Link>
              </li>
              <li>
                <Link to="/cloud-destinations/">Cloud Destinations</Link>
              </li>
              <li>
                <Link to="/sources-and-sdks/">Sources &amp; SDKs</Link>
              </li>
              <li>
                <a href="https//metarouter.io/#contact">Help</a>
              </li>
            </ul>

            <div
              dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />
          </section>
        </Layout>
      )
    }}
  />
)
