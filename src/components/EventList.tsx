import * as React from "react";
import Section from "./Section";
import * as styles from "./EventList.module.css";
import eventsData from "../data/events.json";
import type { EventItem } from "../types/content";

const events = eventsData as EventItem[];

const kindLabel: Record<EventItem["kind"], string> = {
  stream: "stream",
  "watch-party": "watch party",
  community: "community",
  special: "special",
  subathon: "subathon",
};

export const EventList: React.FC = () => (
  <Section
    id="events"
    heading="What's Going On?"
    intro="Do you know you have 30 minutes? 30. Thirty. THIRTY. Riiight. Here's what's coming up at Doki's Kingdom. Will you answer the Kingdom's call?"
  >
    {events.length === 0 ? (
      <p className={styles.empty}>
        Nothing special on the books yet but the next event is always closer
        than it looks.
        <br />
        Hop into Discord for announcements!
      </p>
    ) : (
      <ul className={styles.list}>
        {events.map((event) => (
          <li key={event.id} className={styles.row}>
            <span className={styles.when}>
              <strong>{event.date}</strong>
              {event.time}
            </span>
            <span>
              <span className={styles.title}>{event.title}</span>
              <p>{event.description}</p>
            </span>
            <span className={styles.kind}>{kindLabel[event.kind].trim()}</span>
          </li>
        ))}
      </ul>
    )}
  </Section>
);

export default EventList;
