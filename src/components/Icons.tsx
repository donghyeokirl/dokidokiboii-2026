import * as React from "react";

import twitchLogo from "../images/socials/logos_twitch.svg";
import youtubeLogo from "../images/socials/logos_youtube.svg";
import patreonLogo from "../images/socials/logos_patreon.svg";
import instagramLogo from "../images/socials/logos_instagram.svg";
import tiktokLogo from "../images/socials/logos_tiktok.svg";
import blueskyLogo from "../images/socials/logos_bluesky.svg";
import discordLogo from "../images/socials/logos_discord.svg";
import kofiLogo from "../images/socials/logos_kofi.svg";

const imageStyle = { display: "block", width: 28, height: 28 };

const makeIcon = (src: string) => {
  const SocialIcon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (
    props,
  ) => {
    const { style, width, height, ...rest } = props;
    const resolvedStyle = {
      ...imageStyle,
      ...(width !== undefined ? { width } : {}),
      ...(height !== undefined ? { height } : {}),
      ...style,
    };

    return (
      <img
        {...rest}
        src={src}
        alt=""
        width={width ?? imageStyle.width}
        height={height ?? imageStyle.height}
        style={resolvedStyle}
        draggable={false}
      />
    );
  };

  return SocialIcon;
};

export const TwitchIcon = makeIcon(twitchLogo);
export const YoutubeIcon = makeIcon(youtubeLogo);
export const PatreonIcon = makeIcon(patreonLogo);
export const InstagramIcon = makeIcon(instagramLogo);
export const TiktokIcon = makeIcon(tiktokLogo);
export const BlueskyIcon = makeIcon(blueskyLogo);

export const DiscordIcon = makeIcon(discordLogo);
export const KofiIcon = makeIcon(kofiLogo);

export const iconMap = {
  twitch: TwitchIcon,
  youtube: YoutubeIcon,
  patreon: PatreonIcon,
  instagram: InstagramIcon,
  discord: DiscordIcon,
  tiktok: TiktokIcon,
  bluesky: BlueskyIcon,
  kofi: KofiIcon,
};
