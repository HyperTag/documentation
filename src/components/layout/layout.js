import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, Link } from 'gatsby'

import './layout.css'
import ContentNav from './../content-nav/content-nav'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div className="nav-list">
        <h1>
          <Link className="logo" to="/">
            {data.site.siteMetadata.title}
          </Link>
        </h1>
        <input type="text" id="search-input" placeholder="search..." />

        <ContentNav />
      </div>

      <main>
        <nav className="clearfix">
          <ul className="header-links">
            <li>
              <a href="https://metarouter.io">Home</a>
            </li>
            <li>
              <a href="https://app.metarouter.io">App</a>
            </li>
            <li>
              <a href="https://metarouter.io/#contact">Help</a>
            </li>
          </ul>
        </nav>

        {children}

        <footer>
          <p>© {new Date().getFullYear()} MetaRouter</p>

          <p id="disclaimer">
            <strong>Disclaimer:</strong> MetaRouter Cloud leverages code from several of{' '}
            <a href="https://segment.com" target="_blank" rel="noopener noreferrer">
              Segment's
            </a>{' '}
            fabulous library of open-source tools, including their{' '}
            <a href="https://segment.com/docs/sources/" target="_blank" rel="noopener noreferrer">
              source SDKs
            </a>
            ,{' '}
            <a href="https://segment.com/docs/destinations" target="_blank" rel="noopener noreferrer">
              destinations
            </a>
            , and core{' '}
            <a href="https://segment.com/docs/sources/website/analytics.js/" target="_blank" rel="noopener noreferrer">
              Analytics.js
            </a>{' '}
            library. As some of the core configurations outlined in our docs are largely identical to Segment's, we
            often re-purpose, and in some cases copy, directly from Segment's docs. In the cases where we have forked
            Segment's tools, we acknowledge and attribute all credit to Segment for their creation and subsequent
            documentation.
          </p>
        </footer>
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
