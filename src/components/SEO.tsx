import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { site } from "../data/site"
import { socials } from "../data/socials"

interface SEOProps {
  title?: string
  description?: string
  pathname?: string
  image?: string
  /** Set false on utility pages (e.g. 404) to keep them out of search results. */
  index?: boolean
  /** Extra JSON-LD objects to render in addition to the default Person/WebSite schema. */
  structuredData?: Record<string, unknown>[]
}

interface SiteMetaQuery {
  site: {
    siteMetadata: {
      title: string
      description: string
      siteUrl: string
      image: string
      lang: string
    }
  }
}

/**
 * Renders directly into Gatsby's built-in <Head> export (gatsby-plugin-react-helmet
 * is intentionally not used here — mixing react-helmet's global singleton with the
 * Head API causes tag state to leak between statically-built pages).
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  pathname = "/",
  image,
  index = true,
  structuredData = [],
}) => {
  const { site: siteData } = useStaticQuery<SiteMetaQuery>(graphql`
    query SEOQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          image
          lang
        }
      }
    }
  `)

  const meta = siteData.siteMetadata
  const seoTitle = title ? `${title} | ${meta.title}` : meta.title
  const seoDescription = description ?? meta.description
  const canonical = `${meta.siteUrl}${pathname === "/" ? "" : pathname}`
  const seoImage = `${meta.siteUrl}${image ?? meta.image}`

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: "DokiDokiBoii",
    description: site.shortDescription,
    url: meta.siteUrl,
    image: seoImage,
    sameAs: socials.map((s) => s.url),
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: meta.title,
    url: meta.siteUrl,
  }

  return (
    <>
      <html lang={meta.lang} />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="robots" content={index ? "index, follow" : "noindex, nofollow"} />
      <meta name="theme-color" content="#0f0b14" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      {structuredData.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </>
  )
}

export default SEO
