// Cloudflare Pages Function — deployed automatically from this file's path
// (functions/is-live.js -> GET /is-live). Runs in Cloudflare's Workers
// runtime, not Node/the browser, so this is intentionally plain JS rather
// than sharing the app's TypeScript setup.
//
// This checks the DecAPI Twitch viewer-count endpoint directly because it
// returns either a numeric viewer count while live or the literal text
// "<channel> is offline" when the stream is down.

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const channel = url.searchParams.get("channel");

  if (!channel) {
    return new Response(JSON.stringify({ error: "missing channel" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(
      `https://decapi.me/twitch/viewercount/${encodeURIComponent(channel.trim())}`,
      {
        headers: {
          "User-Agent": "dokidokiboii-site/1.0",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`DecAPI returned ${response.status}`);
    }

    const text = (await response.text()).trim();

    if (text.toLowerCase().includes("offline")) {
      return new Response(JSON.stringify({ live: false, viewers: 0 }), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "max-age=30",
        },
      });
    }

    const viewers = Number(text);

    if (Number.isNaN(viewers)) {
      throw new Error(`Unexpected DecAPI response: ${text}`);
    }

    return new Response(JSON.stringify({ live: true, viewers }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=30",
      },
    });
  } catch (err) {
    console.error("is-live check failed:", err);
    return new Response(
      JSON.stringify({ live: false, error: "upstream_unavailable" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
