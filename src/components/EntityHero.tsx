import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./EntityHero.module.css"

interface EntityHeroProps {
  bannerImage: string
  logoImage: string
  title: string
  tag: string
  metaText: string
  backTo: string
  backLabel: string
}

export const EntityHero: React.FC<EntityHeroProps> = ({
  bannerImage,
  logoImage,
  title,
  tag,
  metaText,
  backTo,
  backLabel,
}) => (
  <div>
    <div className={styles.banner}>
      <img src={bannerImage} alt="" role="presentation" />
      <div className={styles.bannerFade} aria-hidden="true" />
    </div>
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logoImage} alt={`${title} logo`} />
      </div>
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.meta}>
          <span className={styles.tag}>{tag}</span>
          <span>{metaText}</span>
        </p>
      </div>
    </div>
    <div className={styles.backLinkRow}>
      <Link to={backTo}>&larr; {backLabel}</Link>
    </div>
  </div>
)

export default EntityHero
