import React from 'react'
import { useStaticQuery, Link, graphql } from 'gatsby'

import Layout from './../components/layout/layout'
import SEO from './../components/seo'

export default () => {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(frontmatter: { path: { eq: "/" } }) {
        html
      }
    }
  `)

  return (
    <Layout>
      <SEO />

      <section>
        <ul className="cards">
          <li>
            <Link to="/enterprise-edition/">MetaRouter Enterprise</Link>
          </li>
          <li>
            <Link to="/cloud-edition/">MetaRouter Cloud</Link>
          </li>
          <li>
            <Link to="/enterprise-destinations/">Enterprise Destinations</Link>
          </li>
          <li>
            <Link to="/cloud-destinations/">Cloud Destinations</Link>
          </li>
          <li>
            <Link to="/sources-and-sdks/">Sources &amp; SDKs</Link>
          </li>
          <li>
            <a href="https://metarouter.io/#contact">Help</a>
          </li>
        </ul>

        <div id="home-content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </section>
    </Layout>
  )
}
