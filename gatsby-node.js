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

  // group related pages by collectionKey, sort by collectionIndex and merge into a single HTML string
  const grouped = _.groupBy(nodes, n => n.frontmatter.collectionKey)
  const sortBy = node => node.frontmatter.collectionIndex
  let pages = grouped.null.map(page => {
    page.html = `<section>${page.html}</section>`
    return page
  })

  Object.keys(grouped).forEach(key => {
    if (key !== 'null') {
      const sorted = _.sortBy(grouped[key], [sortBy])
      sorted[0].html = sorted
        .map(page => `<section>${page.html}</section>`)
        .join('')
      pages = [...pages, sorted[0]]
    }
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
