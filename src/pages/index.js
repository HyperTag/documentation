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
      <SEO htmlClass="home-page" />

      <section>
        <h1>MetaRouter Documentation</h1>

        <ul className="cards">
          <li className="enterprise-edition">
            <Link to="/enterprise-edition/">
              <h1>MetaRouter Enterprise</h1>
              <p>Deploy an end-to-end data router on your own cloud with maximum control, flexibility, and security.</p>
            </Link>
          </li>
          <li className="enterprise-edition">
            <Link to="/enterprise-destinations/overview/">
              <h1>Enterprise Destinations</h1>
              <p></p>
            </Link>
          </li>
          <li className="cloud-edition">
            <Link to="/cloud-edition/">
              <h1>MetaRouter Cloud</h1>
              <p>Securely send events to our cloud-based platform from web, mobile, and server-side sources.</p>
            </Link>
          </li>
          <li className="cloud-edition">
            <Link to="/cloud-destinations/overview/">
              <h1>Cloud Destinations</h1>
            </Link>
          </li>
          <li>
            <Link to="/sources-and-sdks/">
              <h1>Sources &amp; SDKs</h1>
              <p>MetaRouter client-side and server-side integrations for your preferred development stack.</p>
            </Link>
          </li>
          <li>
            <a href="https://metarouter.io/#contact">
              <h1>Help</h1>
              <p></p>
            </a>
          </li>
        </ul>

        <div id="home-content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </section>
    </Layout>
  )
}
