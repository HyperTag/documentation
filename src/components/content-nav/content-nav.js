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
              collectionKey
              collectionTitle
              path
            }
          }
        }
      }
    }
  `)

  const nodes = data.allMarkdownRemark.edges.map(e => e.node.frontmatter)

  const collections = {}

  nodes
    .filter(n => n.navIndex !== null)
    .sort((a, b) => a.navIndex - b.navIndex) // sort collections
    .forEach(n => {
      if (n.collectionKey && !collections[n.collectionKey]) {
        collections[n.collectionKey] = nodes
          .filter(({ collectionKey }) => collectionKey === n.collectionKey)
          .sort((a, b) => a.collectionIndex - b.collectionIndex) // sort items within collections
      }
    })

  return (
    <>
      {Object.keys(collections).map(key => (
        <>
          {<h2>{collections[key][0].collectionTitle}</h2>}
          <ul>
            {collections[key].map(x => (
              <li key={x.path}>
                <Link to={x.path}>{x.navText}</Link>
              </li>
            ))}
          </ul>
        </>
      ))}
    </>
  )
}

export default ContentNav
