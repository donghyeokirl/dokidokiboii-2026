import * as React from "react";
import Section from "./Section";
import * as styles from "./DiscordInvite.module.css";
import { socials } from "../data/socials";
import { iconMap } from "./Icons";
import serverArt from "../images/socials/dokis_dungeon.webp";

const discord = socials.find((social) => social.icon === "discord");

export const DiscordInvite: React.FC = () => {
  if (!discord) {
    return null;
  }

  const DiscordIcon = iconMap[discord.icon];

  return (
    <Section
      id="discord"
      heading="Do you host?"
      intro="Well... do you? Anyways, stick it out for the server!"
      sectionClassName={styles.section}
      headingClassName={styles.heading}
      introClassName={styles.intro}
    >
      <a
        href={discord.url}
        target="_blank"
        rel="noreferrer noopener"
        className={styles.card}
      >
        <div className={styles.mainRow}>
          <div className={styles.avatarWrap}>
            <img
              src={serverArt}
              alt=""
              aria-hidden="true"
              className={styles.serverArt}
            />
          </div>

          <div className={styles.brand}>
            <div className={styles.textWrap}>
              <span className={styles.label}>DOKI'S DUNGEON</span>
              <span className={styles.server}>The Dokidokiboii Community</span>
            </div>
          </div>

          <div className={styles.copy}>
            <p className={styles.summary}>
              <strong>Hear ye! Hear ye!</strong>
              <br />
              Welcome to Doki's Dungeon, a place for any and all adventurers.
            </p>
          </div>

          <span className={styles.cta}>Join Now</span>
        </div>
      </a>
    </Section>
  );
};

export default DiscordInvite;
