import type { GatsbyConfig } from "gatsby";

const siteUrl = "https://dokidokiboii.tv";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "DokiDokiBoii",
    titleTemplate: "%s | DokiDokiBoii",
    description:
      "Dokidokiboii is a proudly queer streamer, support main by nature (deeps mode activated for PvP), cat dad, real dad, and hopeless romantic married to the love of their life. Equal parts wholesome, chaotic, and unapologetically weird, Doki's mission is simple: show you that being yourself — cringe and all — is the best thing you'll ever do for you. Expect WoW raids, League chaos (don't ask), Pokémon nostalgia, Kingdom Hearts lore spirals, and Animal Crossing coziness, all wrapped in relentless positivity and a little bit of toxic charm.",
    siteUrl,
    author: "@dokidokiboii",
    lang: "en",
    image: "/og-cover.png",
  },
  graphqlTypegen: false,
  trailingSlash: "never",
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "DokiDokiBoii",
        short_name: "DokiDokiBoii",
        start_url: "/",
        background_color: "#0F0B14",
        theme_color: "#FF3D74",
        display: "standalone",
        icon: "src/images/dokidokiboii-sparkle.png",
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/404", "/404.html"],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-plugin-svgr-loader",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
  ],
};

export default config;
