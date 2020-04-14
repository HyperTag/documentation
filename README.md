# MetaRouter Public Docs

This version of the docs is built with [Gatsby](https://www.gatsbyjs.org/).

## Install Gatsby CLI

```
npm install -g gatsby-cli
cd docs-gatsby
yarn install
```

## Development

Run `gatsby develop`. Try running `gatsby clean` first if you encounter errors.

## Build & Run Locally

Run `gatsby build && gatsby serve`.

## Live Environment & Deployment

## URL Redirects from the Previous Version

URL redirects from the [previous version](https://gitlab.com/metarouter/documentation) of the public docs are handled by creating a markdown file for each URL in `/src/content/_redirects`.

The markdown file requires two fields in its frontmatter specifying the original path and the new URL that should handle the request instead.

```
---
path: /v2/editions/cloud/overview.html
redirectTo: /cloud-edition/
---
```

These files are then handled by the **redirect.js** template that uses a meta refresh to route users and search engines to the correct destination. The meta refresh is used to due to limited options for redirects on the Github pages platform.

## Expected Markdown Format
