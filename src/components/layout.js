/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, Link } from 'gatsby'

import './layout.css'
import '../fonts/fonts.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
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
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </h1>
        <input type="text" id="search-input" placeholder="search..." />
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

        <div id="md-content">{children}</div>

        <footer>© {new Date().getFullYear()} MetaRouter</footer>
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
