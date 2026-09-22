import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./CardGrid.module.css"
import deities from "../data/deities.json"
import type { Deity } from "../types/content"

export const DeityGrid: React.FC = () => (
  <ul className={styles.grid}>
    {(deities as Deity[]).map((d) => (
      <li key={d.id} className={styles.card}>
        <Link to={`/deity-studies/${d.slug}`}>
          <div className={styles.imageWrap}>
            <img src={d.cardImage} alt={`${d.group} cover art`} loading="lazy" />
          </div>
          <div className={styles.body}>
            <span className={styles.meta}>
              <span>{d.fandomName}</span>
              <span className={styles.tag}>{d.origin}</span>
            </span>
            <span className={styles.name}>{d.group}</span>
            <p className={styles.note}>{d.note}</p>
          </div>
        </Link>
      </li>
    ))}
  </ul>
)

export default DeityGrid
