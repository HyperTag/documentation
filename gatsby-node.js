/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const _ = require('lodash')
const cheerio = require('cheerio')
const fs = require('fs-extra')
const ncp = require('ncp').ncp

const query = `
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
          tags
        }
        html
        fileAbsolutePath
      }
    }
  }
}
`

const setTableColumnWidths = nodes => {
  return nodes.map(node => {
    const $ = cheerio.load(node.html)
    const regex = /\[\d*\]/g // match [25] format for column width

    $('table tbody tr:first-child').each((i, el) => {
      const row = $(el)

      if (
        row
          .find('td')
          .text()
          .match(regex)
      ) {
        const columnWidths = row
          .find('td')
          .text()
          .split('][')
          .map(segment => segment.replace('[', '').replace(']', '')) // strip remaining brackets

        const th = row.closest('table').find('th')

        // for case where table may not have a header row
        const td = row.next().find('td')

        const cells = th.length ? th : td

        // set width as inline style attr
        cells.each((i, el) => $(el).attr('style', `width: ${columnWidths[i]}%;`))

        // delete this row
        row.remove()
      }
    })

    node.html = $.html()
    return node
  })
}

const tableOfContentsItems = $ => {
  const items = $('h2')
    .map((i, el) => {
      const item = $(el)
      const href = item.find('.anchor').attr('href')

      return `<li><a href="${href}">${item.text()}</a></li>`
    })
    .get()
    .join(' ')

  return items
}

// renders a content section
const section = ($, isPage) => {
  if (isPage) {
    $('h1')
      .first()
      .find('a')
      .attr('href', '#')
  }

  const tocItems = tableOfContentsItems($)
  let toc = `
    <div class="toc">
      <div class="toc-sticky">
        <h6>${isPage ? 'On this Page' : 'In this Section'}:</h6>
        <ul>${tocItems}</ul>
      </div>
    </div>
  `

  return `
    <section>
      ${tocItems.length ? toc : ''}
      ${$.html()}
    </section>
    <div class="section-border"></div>
  `
}

// group related pages by key when collectionMerge is set to true
const createGroups = nodes => {
  const groups = []

  nodes.forEach(n => {
    const { collectionMerge, collectionKey } = n.frontmatter

    if (collectionMerge === true && !groups[collectionKey]) {
      groups.push({
        key: collectionKey,
        nodes: nodes
          .filter(node => collectionKey === node.frontmatter.collectionKey)
          .sort((a, b) => a.frontmatter.collectionIndex - b.frontmatter.collectionIndex),
      })
    }
  })

  return groups
}

// render a section for each markdown node and concat the results into a single string of HTML
const mergeGroups = nodes => {
  return nodes
    .map((node, i) => {
      const $ = cheerio.load(node.html)
      const fragment =
        i === 0
          ? '' // first header doesn't need a redundant hash
          : node.frontmatter.path.replace(
              /\//g, // remove slashes
              ''
            )

      // TODO error if <h1> is not the first child, verify fragment is unique
      // replace fragments generated by autolink plugin with the path from the markdown file
      $('h1')
        .first()
        .attr('id', fragment)
        .addClass('section-anchor')
        .find('a')
        .attr('href', `#${fragment}`)

      // content of each markdown file gets its own section
      return section($)
    })
    .join('')
}

// add tags from frontmatter as data attrs to primary heading
const addTags = nodes => {
  return nodes.map(node => {
    if (node.frontmatter.tags) {
      const $ = cheerio.load(node.html)

      $('h1')
        .first()
        .attr('data-tags', node.frontmatter.tags)

      node.html = $.html()
    }

    return node
  })
}

const linkImages = nodes => {
  return nodes.map(node => {
    const $ = cheerio.load(node.html)
    const images = $('img')

    if (images.length) {
      images.each((i, el) => {
        var image = $(el)

        image.wrap(`<a href="${image.attr('src')}" target="_mr"></a>`)
      })
      node.html = $.html()
    }

    return node
  })
}

// changes images served from /static to be served from CDN for prod builds
const replaceImageUrls = nodes => {
  if (process.env.NODE_ENV !== 'production') {
    return nodes
  }

  return nodes.map(node => {
    const $ = cheerio.load(node.html)
    const images = $('img')

    if (images.length) {
      images.each((i, el) => {
        const image = $(el)
        if (image.attr('src').startsWith('/images/')) {
          image.attr('src', image.attr('src').replace('/images/', 'https://cdn.metarouter.io/web/img/docs/content/'))
        }
      })
      node.html = $.html()
    }

    return node
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const result = await graphql(query)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const redirects = result.data.allMarkdownRemark.edges
    .map(e => e.node)
    .filter(node => node.fileAbsolutePath.includes('_redirects'))

  let nodes = result.data.allMarkdownRemark.edges
    .map(e => e.node)
    .filter(
      node => !node.fileAbsolutePath.includes('_markdown-templates') && !node.fileAbsolutePath.includes('_redirects')
    )

  // run mutations on node content
  nodes = setTableColumnWidths(nodes)
  nodes = addTags(nodes)
  nodes = replaceImageUrls(nodes)
  nodes = linkImages(nodes)

  const groups = createGroups(nodes)

  // start with single pages
  let pages = _.difference(nodes, _.flatten(groups.map(g => g.nodes))).map(n => {
    const $ = cheerio.load(n.html)

    n.html = section($, true)
    return n
  })

  groups.forEach(group => {
    // overwrite the first node's html with concatenated html from all nodes in the group
    group.nodes[0].html = mergeGroups(group.nodes)
    pages = [...pages, group.nodes[0]] // add merged page to the collection of pages
  })

  pages.forEach(({ frontmatter, html }) => {
    createPage({
      path: frontmatter.path,
      component: path.resolve(`src/templates/page.js`),
      context: {
        html,
      },
    })
  })

  redirects.forEach(({ frontmatter }) => {
    createPage({
      path: frontmatter.path,
      component: path.resolve(`src/templates/redirect.js`),
    })
  })
}

exports.onPostBuild = () => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  // move built files from /public to /docs for github pages
  return new Promise((resolve, reject) => {
    ncp(path.join(__dirname, 'public'), path.join(__dirname, 'docs'), err => {
      if (err) {
        console.error(err)
        reject()
      }
      console.log('copied from /public to /docs')

      fs.emptyDir(path.join(__dirname, 'public'), err => {
        if (err) {
          console.error(err)
          reject()
        }

        console.log('emptied /public dir')
        resolve()
      })
    })
  })
}
