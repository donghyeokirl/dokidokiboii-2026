import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import EntityHero from "../components/EntityHero"
import Section from "../components/Section"
import VideoLinks from "../components/VideoLinks"
import SEO from "../components/SEO"
import type { GameItem } from "../types/content"

interface GamePageContext {
  game: GameItem
}

const GamePage: React.FC<PageProps<object, GamePageContext>> = ({ pageContext }) => {
  const { game } = pageContext

  return (
    <Layout>
      <EntityHero
        bannerImage={game.bannerImage}
        logoImage={game.logoImage}
        title={game.title}
        tag={game.status}
        metaText={game.note}
        backTo="/deity-studies"
        backLabel="Deity Studies"
      />
      <Section heading="The rundown" intro={game.note}>
        <p>{game.bio}</p>
      </Section>
      <Section heading="Related videos">
        <VideoLinks videos={game.videos} subjectName={game.title} />
      </Section>
    </Layout>
  )
}

export default GamePage

export const Head: HeadFC<object, GamePageContext> = ({ pageContext }) => {
  const { game } = pageContext
  return (
    <SEO
      title={game.title}
      description={`${game.title} — ${game.note}`}
      pathname={`/deity-studies/games/${game.slug}`}
      image={game.cardImage}
      structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: game.title,
          description: game.bio,
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
              name: game.title,
              item: `https://dokidokiboii.tv/deity-studies/games/${game.slug}`,
            },
          ],
        },
      ]}
    />
  )
}
