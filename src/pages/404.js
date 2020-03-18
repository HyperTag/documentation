import React from 'react'

import Layout from '../components/layout/layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />

    <section>
      <h1>Not Found</h1>

      <p>We're sorry, the route you requested does not exist.</p>
    </section>
  </Layout>
)

export default NotFoundPage
