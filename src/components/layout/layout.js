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

        <footer>© {new Date().getFullYear()} MetaRouter</footer>
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
