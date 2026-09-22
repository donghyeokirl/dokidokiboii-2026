import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import PageHeader from "../components/PageHeader"
import Section from "../components/Section"
import DeityGrid from "../components/DeityGrid"
import GameGrid from "../components/GameGrid"
import SEO from "../components/SEO"

const DeityStudiesPage: React.FC<PageProps> = () => (
  <Layout>
    <PageHeader
      title="Deity Studies"
      intro="An ongoing, extremely biased field guide: the K-pop and P-pop groups on permanent rotation, and the games currently owning every stream schedule."
    />

    <Section
      id="biases"
      heading="Current biases"
      intro="Subject to change the moment a new comeback drops."
    >
      <DeityGrid />
    </Section>

    <Section id="games" heading="Games on rotation" intro="Playing now, cleared, and what's queued up next.">
      <GameGrid />
    </Section>
  </Layout>
)

export default DeityStudiesPage

export const Head: HeadFC = () => (
  <SEO
    title="Deity Studies"
    description="The K-pop and P-pop groups DokiDokiBoii is currently biased toward, plus the games on rotation across streams."
    pathname="/deity-studies"
  />
)
