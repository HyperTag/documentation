import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import _ from 'lodash'

const ContentNav = () => {
  const data = useStaticQuery(graphql`
    {
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

  const grouped = []

  nodes
    .filter(n => n.navIndex !== null)
    .forEach(n => {
      // group links if necessary
      if (n.collectionKey && !grouped.find(g => g.key === n.collectionKey)) {
        const primaryNode = nodes.find(
          node =>
            node.collectionIndex === 0 && node.collectionKey === n.collectionKey
        )

        grouped.push({
          collectionTitle: primaryNode.collectionTitle,
          navIndex: primaryNode.navIndex,
          key: primaryNode.collectionKey,
          nodes: nodes
            .filter(({ collectionKey }) => collectionKey === n.collectionKey)
            .sort((a, b) => a.collectionIndex - b.collectionIndex), // sort items within collections
        })
      }
    })

  grouped.push({
    key: 'null',
    navIndex: 0,
    nodes: _.difference(nodes, _.flatten(grouped.map(g => g.nodes))), // should only contain the home page, but all ungrouped pages get dumped here by default
  })

  return (
    <>
      {grouped
        .sort((a, b) => a.navIndex - b.navIndex) // sort groups
        .map(g => (
          <>
            {g.collectionTitle && <h2>{g.collectionTitle}</h2>}
            <ul>
              {g.nodes.map(x => (
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
