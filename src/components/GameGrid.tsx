import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./CardGrid.module.css"
import games from "../data/games.json"
import type { GameItem } from "../types/content"

export const GameGrid: React.FC = () => (
  <ul className={styles.grid}>
    {(games as GameItem[]).map((g) => (
      <li key={g.id} className={styles.card}>
        <Link to={`/deity-studies/games/${g.slug}`}>
          <div className={styles.imageWrapSquare}>
            <img src={g.cardImage} alt={`${g.title} cover art`} loading="lazy" />
          </div>
          <div className={styles.body}>
            <span className={styles.meta}>
              <span className={styles.tag}>{g.status}</span>
            </span>
            <span className={styles.name}>{g.title}</span>
            <p className={styles.note}>{g.note}</p>
          </div>
        </Link>
      </li>
    ))}
  </ul>
)

export default GameGrid
