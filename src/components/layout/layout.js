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

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              navIndex
              path
              title
            }
          }
        }
      }
    }
  `)

  const nodes = data.allMarkdownRemark.edges.map(e => e.node.frontmatter)

  return (
    <>
      <div className="nav-list">
        <h1>
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </h1>
        <input type="text" id="search-input" placeholder="search..." />
        <ul>
          {nodes
            .filter(n => n.navIndex !== null)
            .sort((a, b) => {
              if (a.navIndex === b.navIndex) {
                console.log(a.navIndex[1], b.navIndex[1])
                if (a.navIndex[1] === undefined) {
                  return a
                }

                return b
              }

              if (
                a.navIndex === b.navIndex &&
                a.navIndex.length === 2 &&
                b.navIndex.length === 2
              ) {
                return a.navIndex[1] - b.navIndex[1]
              }

              return a.navIndex[0] - b.navIndex[0]
            })
            .map(n => (
              <li>
                <Link to={n.path}>{n.title}</Link>
              </li>
            ))}
        </ul>
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
