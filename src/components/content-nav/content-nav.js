import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

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
              collectionTitle
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
    <>
      {nested.map(n => (
        <>
          {n.collectionTitle && <h2>{n.collectionTitle}</h2>}
          <ul>
            <li key={n.path}>
              <a href={n.path}>{n.navText}</a>
            </li>

            {n.children &&
              n.children.map(x => (
                <li key={x.title}>
                  <a href={x.path}>{x.navText}</a>
                </li>
              ))}
          </ul>
        </>
      ))}
    </>
  )
}

export default ContentNav
