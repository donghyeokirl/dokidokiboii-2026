import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import PageHeader from "../components/PageHeader"
import SEO from "../components/SEO"

const NotFoundPage: React.FC<PageProps> = () => (
  <Layout>
    <PageHeader title="Page not found" intro="That link doesn't lead anywhere on this site." />
    <div style={{ textAlign: "center", padding: "var(--space-4) var(--space-3) var(--space-6)" }}>
      <Link to="/" style={{ color: "var(--pink)" }}>
        Back to home
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage

export const Head: HeadFC = () => <SEO title="Page not found" pathname="/404" index={false} />
