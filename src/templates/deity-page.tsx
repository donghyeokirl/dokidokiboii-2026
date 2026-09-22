import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import EntityHero from "../components/EntityHero"
import Section from "../components/Section"
import VideoLinks from "../components/VideoLinks"
import SEO from "../components/SEO"
import type { Deity } from "../types/content"

interface DeityPageContext {
  deity: Deity
}

const DeityPage: React.FC<PageProps<object, DeityPageContext>> = ({ pageContext }) => {
  const { deity } = pageContext

  return (
    <Layout>
      <EntityHero
        bannerImage={deity.bannerImage}
        logoImage={deity.logoImage}
        title={deity.group}
        tag={deity.origin}
        metaText={deity.fandomName}
        backTo="/deity-studies"
        backLabel="Deity Studies"
      />
      <Section heading="Why they're on the list" intro={deity.note}>
        <p>{deity.bio}</p>
      </Section>
      <Section heading="Related videos">
        <VideoLinks videos={deity.videos} subjectName={deity.group} />
      </Section>
    </Layout>
  )
}

export default DeityPage

export const Head: HeadFC<object, DeityPageContext> = ({ pageContext }) => {
  const { deity } = pageContext
  return (
    <SEO
      title={deity.group}
      description={`${deity.group} (${deity.fandomName}) — ${deity.note}`}
      pathname={`/deity-studies/${deity.slug}`}
      image={deity.cardImage}
      structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          name: deity.group,
          genre: deity.origin,
          description: deity.bio,
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://dokidokiboii.tv/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Deity Studies",
              item: "https://dokidokiboii.tv/deity-studies",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: deity.group,
              item: `https://dokidokiboii.tv/deity-studies/${deity.slug}`,
            },
          ],
        },
      ]}
    />
  )
}
