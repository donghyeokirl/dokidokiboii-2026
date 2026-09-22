import type { GatsbyNode } from "gatsby"
import path from "path"
import deities from "./src/data/deities.json"
import games from "./src/data/games.json"
import type { Deity, GameItem } from "./src/types/content"

export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const { createPage } = actions

  const deityTemplate = path.resolve("./src/templates/deity-page.tsx")
  const gameTemplate = path.resolve("./src/templates/game-page.tsx")

  ;(deities as Deity[]).forEach((deity) => {
    createPage({
      path: `/deity-studies/${deity.slug}`,
      component: deityTemplate,
      context: { deity },
    })
  })
  ;(games as GameItem[]).forEach((game) => {
    createPage({
      path: `/deity-studies/games/${game.slug}`,
      component: gameTemplate,
      context: { game },
    })
  })
}
