export interface VideoLink {
  title: string;
  url: string;
}

export interface EventItem {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  kind: "stream" | "watch-party" | "community" | "special" | "subathon";
}

export interface LiveConfig {
  /**
   * "auto" — poll the Cloudflare Pages Function (/is-live) and reflect Twitch's
   *          real live status.
   * "always" — force the live bento layout + embed on, regardless of real
   *          status. For a planned event where you want the takeover ready
   *          ahead of time.
   * "never" — force it off, even if the channel happens to be live.
   */
  mode: "auto" | "always" | "never";
  twitchChannel: string;
  liveNote: string;
}
