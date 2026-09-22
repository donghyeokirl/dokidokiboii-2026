import * as React from "react"
import * as styles from "./VideoLinks.module.css"
import type { VideoLink } from "../types/content"

interface VideoLinksProps {
  videos: VideoLink[]
  subjectName: string
}

export const VideoLinks: React.FC<VideoLinksProps> = ({ videos, subjectName }) => {
  if (videos.length === 0) {
    return (
      <p className={styles.empty}>
        No videos linked yet for {subjectName} — the next reaction or highlight clip lands here
        first.
      </p>
    )
  }

  return (
    <ul className={styles.list}>
      {videos.map((video) => (
        <li key={video.url + video.title} className={styles.item}>
          <a href={video.url} target="_blank" rel="noreferrer noopener">
            <span className={styles.play} aria-hidden="true">
              ▶
            </span>
            <span>{video.title}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default VideoLinks
