import * as React from "react";
import * as styles from "./Section.module.css";

interface SectionProps {
  id?: string;
  heading: string;
  intro?: string;
  children: React.ReactNode;
  sectionClassName?: string;
  headingClassName?: string;
  introClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  id,
  heading,
  intro,
  children,
  sectionClassName,
  headingClassName,
  introClassName,
}) => (
  <section
    id={id}
    className={[styles.section, sectionClassName].filter(Boolean).join(" ")}
    aria-labelledby={id ? `${id}-heading` : undefined}
  >
    <h2
      id={id ? `${id}-heading` : undefined}
      className={[styles.heading, headingClassName].filter(Boolean).join(" ")}
    >
      {heading}
    </h2>
    {intro && (
      <p className={[styles.intro, introClassName].filter(Boolean).join(" ")}>
        {intro}
      </p>
    )}
    {children}
  </section>
);

export default Section;
