/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const _ = require('lodash')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              path
              collectionKey
              collectionIndex
              collectionMerge
              navText
            }
            html
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const nodes = result.data.allMarkdownRemark.edges
    .map(e => e.node)
    .filter(n => n.frontmatter.path !== '/')

  const grouped = []

  // group related pages by collectionKey, sort by collectionIndex and merge into a single HTML string
  nodes.forEach(n => {
    const { collectionMerge, collectionKey } = n.frontmatter

    if (collectionMerge === true && !grouped[collectionKey]) {
      grouped.push({
        key: collectionKey,
        nodes: nodes
          .filter(node => collectionKey === node.frontmatter.collectionKey)
          .sort(
            (a, b) =>
              a.frontmatter.collectionIndex - b.frontmatter.collectionIndex
          ),
      })
    }
  })

  grouped.push({
    key: 'null',
    nodes: _.difference(nodes, _.flatten(grouped.map(g => g.nodes))),
  })

  let pages = grouped
    .find(g => g.key === 'null')
    .nodes.map(n => {
      n.html = `<section>${n.html}</section>`
      return n
    })

  grouped
    .filter(g => g.key !== 'null')
    .forEach(group => {
      const sorted = _.sortBy(group.nodes, [
        node => node.frontmatter.collectionIndex,
      ])
      sorted[0].html = sorted
        .map(page => `<section>${page.html}</section>`)
        .join('')
      pages = [...pages, sorted[0]]
    })

  pages.forEach(({ frontmatter, html }) => {
    if (frontmatter.path) {
      createPage({
        path: frontmatter.path,
        component: path.resolve(`src/templates/page.js`),
        context: {
          html,
        },
      })
    }
  })
}
