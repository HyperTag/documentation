import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import _ from 'lodash'
import slugify from 'slugify'

const ListItem = ({ node }) => {
  return (
    <li key={node.path}>
      <Link to={node.path}>{node.navText}</Link>
    </li>
  )
}

const getSortBy = node => {
  // trim leading period for .NET
  let sortBy = node.navText.startsWith('.') ? node.navText.substr(1) : node.navText

  if (!_.isNull(node.collectionIndex)) {
    sortBy = node.collectionIndex
  }

  return sortBy === 'string' ? sortBy.toLowerCase() : sortBy.toString()
}

const ContentNav = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
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
              collectionMerge
              path
            }
          }
        }
      }
    }
  `)

  const grouped = []
  const nodes = allMarkdownRemark.edges.map(e => e.node.frontmatter)

  // group links if necessary
  nodes.forEach(n => {
    if (n.collectionKey && !grouped.find(g => g.key === n.collectionKey)) {
      const group = _.cloneDeep(nodes)
        .filter(({ collectionKey }) => collectionKey === n.collectionKey)
        .sort((a, b) => getSortBy(a).localeCompare(getSortBy(b)))

      const primaryNode = group[0]

      grouped.push({
        collectionTitle: primaryNode.collectionTitle,
        navIndex: primaryNode.navIndex,
        key: primaryNode.collectionKey,
        nodes: group.map((node, i) => {
          if (i === 0 || !primaryNode.collectionMerge) {
            return node
          }

          // overwrite provided path with fragment identifier for inline sub pages
          node.path = `${primaryNode.path}#${node.path.replace(
            /\//g, // remove slashes
            ''
          )}`
          return node
        }),
      })
    }
  })

  // should only contain the root path, but all ungrouped pages get dumped here by default
  const ungrouped = nodes.filter(n => !n.collectionIndex && !n.collectionKey)

  return (
    <>
      {[...grouped, ...ungrouped]
        .sort((a, b) => a.navIndex - b.navIndex)
        .map(node => (
          <>
            {node.collectionTitle && (
              <>
                <h2>{node.collectionTitle}</h2>
                <ul data-title={slugify(node.collectionTitle, { lower: true })}>
                  {node.nodes.map(subNode => (
                    <ListItem node={subNode} />
                  ))}
                </ul>
              </>
            )}

            {!node.collectionTitle && (
              <>
                <ul>
                  <ListItem node={node} />
                </ul>
              </>
            )}
          </>
        ))}
    </>
  )
}

export default ContentNav
