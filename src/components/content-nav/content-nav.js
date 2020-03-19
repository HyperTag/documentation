import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

const ContentNav = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              navIndex
              navText
              collectionIndex
              path
              title
            }
          }
        }
      }
    }
  `)

  const nodes = data.allMarkdownRemark.edges.map(e => e.node.frontmatter)

  let nested = []

  nodes
    .filter(n => n.navIndex !== null)
    .sort((a, b) => a.navIndex - b.navIndex) // sort top-level items
    .forEach(n => {
      if (n.collectionIndex === 0) {
        n.children = nodes
          .filter(x => x !== n && x.navIndex === n.navIndex)
          .sort((a, b) => a.collectionIndex - b.collectionIndex) // sort sub items
        nested.push(n)
      }

      // add any items not already in the tree
      if (!n.collectionIndex && !n.children) {
        nested.push(n)
      }
    })

  return (
    <ul>
      {nested.map(n => (
        <li>
          <Link to={n.path}>{n.navText || n.title}</Link>
          {n.children && n.children.length > 0 && (
            <ul>
              {n.children.map(x => (
                <li>
                  <Link to={x.path}>{x.navText || x.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

export default ContentNav
