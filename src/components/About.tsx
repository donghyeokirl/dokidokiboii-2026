import * as React from "react";
import Section from "./Section";
import * as styles from "./About.module.css";
import { site } from "../data/site";

export const About: React.FC = () => (
  <Section
    id="about-doki"
    heading="Dokidokiwho?"
    intro="A little about the Kingdom's ruler, Doki."
  >
    <div className={styles.copy}>
      {site.bio.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  </Section>
);

export default About;
