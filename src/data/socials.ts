export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon:
    | "twitch"
    | "youtube"
    | "patreon"
    | "instagram"
    | "discord"
    | "tiktok"
    | "bluesky"
    | "kofi";
}

export const socials: SocialLink[] = [
  {
    name: "Twitch",
    url: "https://www.twitch.tv/dokidokiboii",
    handle: "dokidokiboii",
    icon: "twitch",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@dokidokiboii",
    handle: "@dokidokiboii",
    icon: "youtube",
  },
  {
    name: "Gaming Channel",
    url: "https://www.youtube.com/@dokidokiboiigaming",
    handle: "@dokidokiboiigaming",
    icon: "youtube",
  },
  {
    name: "Patreon",
    url: "https://www.patreon.com/c/dokidokiboii",
    handle: "dokidokiboii",
    icon: "patreon",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/dokidokiboii/",
    handle: "@dokidokiboii",
    icon: "instagram",
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@dokidokiboii",
    handle: "@dokidokiboii",
    icon: "tiktok",
  },
  {
    name: "Bluesky",
    url: "https://bsky.app/profile/dokidokiboii.tv",
    handle: "dokidokiboii.tv",
    icon: "bluesky",
  },
  {
    name: "Ko-fi",
    url: "https://ko-fi.com/dokidokiboii",
    handle: "dokidokiboii",
    icon: "kofi",
  },
  {
    name: "Discord",
    url: "https://discord.com/invite/J8m54y5hkZ",
    handle: "dokidokiboii",
    icon: "discord",
  },
];
