import * as React from "react"
import * as styles from "./PageHeader.module.css"

interface PageHeaderProps {
  title: string
  intro?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, intro }) => (
  <div className={styles.header}>
    <h1 className={styles.title}>{title}</h1>
    {intro && <p className={styles.intro}>{intro}</p>}
  </div>
)

export default PageHeader
