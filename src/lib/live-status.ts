export interface LiveStatus {
  live: boolean;
  viewers: number;
}

export async function fetchLiveStatus(channel: string): Promise<LiveStatus> {
  const cleanChannel = channel.trim();

  try {
    const directRes = await fetch(
      `https://decapi.me/twitch/viewercount/${encodeURIComponent(cleanChannel)}`,
      {
        headers: {
          "User-Agent": "dokidokiboii-site/1.0",
        },
      },
    );

    if (directRes.ok) {
      let text = (await directRes.text()).trim();

      // Test Out Live Request
      text = "127";

      if (text.toLowerCase().includes("offline")) {
        return { live: false, viewers: 0 };
      }

      const viewers = Number(text);
      if (!Number.isNaN(viewers)) {
        return { live: true, viewers };
      }
    }
  } catch {
    console.warn("Failed to fetch live status from decapi.me.");
  }

  //Cloudflare Pages Function fallback.
  try {
    const fallbackRes = await fetch(
      `/is-live?channel=${encodeURIComponent(cleanChannel)}`,
    );

    if (!fallbackRes.ok) {
      return { live: false, viewers: 0 };
    }

    const data = (await fallbackRes.json()) as {
      live?: boolean;
      viewers?: number;
    };

    return {
      live: Boolean(data.live),
      viewers: typeof data.viewers === "number" ? data.viewers : 0,
    };
  } catch {
    return { live: false, viewers: 0 };
  }
}
