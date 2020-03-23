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

  // group related pages by collectionKey
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

  // start with single pages
  let pages = nodes
    .filter(n => n.collectionIndex)
    .map(n => {
      n.html = `<section>${n.html}</section>`
      return n
    })

  grouped.forEach(group => {
    // overwrite the first node's html with concatenated html from all nodes in the group
    group.nodes[0].html = group.nodes
      .map(page => `<section>${page.html}</section>`) // content of each markdown file gets its own section
      .join('')
    pages = [...pages, group.nodes[0]] // add merged page to the collection of pages
  })

  pages.forEach(({ frontmatter, html }) => {
    html

    createPage({
      path: frontmatter.path,
      component: path.resolve(`src/templates/page.js`),
      context: {
        html,
      },
    })
  })
}
