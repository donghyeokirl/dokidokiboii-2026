# DOKIDOKIBOII 2026

A 2026 Revamp of the Dokidokiboii Landing Page

A Gatsby + TypeScript marketing and link hub for DokiDokiBoii, built as a static site for Cloudflare Pages. It includes a bento-style homepage, Twitch/live status behavior, social links, event cards, and generated Deity Studies pages for groups and games.

## Stack

- Gatsby 5
- React 18
- TypeScript
- Cloudflare Pages + Wrangler
- Static JSON-driven content

## Getting started

Use either npm or Yarn. This workspace currently includes both lockfiles, and the project scripts are the same in either toolchain.

```bash
yarn install
# or: npm install

yarn develop
# http://localhost:8000
```

## Scripts

```bash
yarn develop      # start Gatsby dev server
yarn build         # production build to public/
yarn serve         # serve the production build locally
yarn typecheck    # TypeScript check without emitting files
yarn clean        # clear Gatsby cache
yarn pages:dev    # build then run the site + Pages Function locally via Wrangler
```

## Project structure

- `src/pages/` — top-level pages such as the home and deity studies landing page
- `src/templates/` — generated page templates for deity/game entries
- `src/data/` — content source files (`site.ts`, `socials.ts`, `events.json`, etc.)
- `src/components/` — reusable UI sections and layout components
- `src/styles/` — global styles and design tokens
- `functions/` — Cloudflare Pages Function for live status checks
- `static/images/` — image assets used by JSON content entries
- `gatsby-config.ts` — site metadata and Gatsby plugins

## Editing content

Most site content is data-driven instead of hardcoded in components.

### `src/data/site.ts`

Site metadata such as name, tagline, bio, and short description.

### `src/data/socials.ts`

Links used throughout the homepage and footer. Each entry includes:

- `name`
- `url`
- `handle`
- `icon`

### `src/data/live.json`

Controls how the live/Twitch card behaves.

```json
{
  "mode": "auto",
  "twitchChannel": "dokidokiboii",
  "liveNote": "Live now — jump into the stream below."
}
```

Supported modes:

- `"auto"` — checks live status through the site’s live-status logic and fallback function
- `"always"` — forces the live card on
- `"never"` — forces the live card off

The live card will embed the Twitch player when live and otherwise link to the channel as a normal card.

### `src/data/events.json`

Array of upcoming or recent event entries. Each item can include:

- `id`
- `date`
- `time`
- `title`
- `description`
- `kind`

`kind` is used to style the label and can be one of `stream`, `watch-party`, `community`, or `special`.

If the array is empty, the section shows an intentional empty-state message instead of breaking the layout.

### `src/data/deities.json` and `src/data/games.json`

These files drive the generated Deity Studies pages. Each entry should include its own slug, images, metadata, and optional video links. Each item generates its own page automatically during build.

Required pieces for each entry generally include:

- `id`
- `slug`
- `group` or title
- `bio` / description
- `bannerImage`
- `logoImage`
- `cardImage`
- `videos` (optional array)

The slug should be unique and URL-safe, since it becomes part of the page path. Image assets live under matching directories in `static/images/`.

## Live status behavior

The live card attempts a direct Twitch viewer-count check first and falls back to a Cloudflare Pages Function at `/is-live` if needed.

The function is located at `functions/is-live.js` and is deployed automatically by Cloudflare Pages. It returns a lightweight JSON payload such as:

```json
{ "live": true, "viewers": 1234 }
```

This allows the site to check Twitch status without exposing credentials to the browser.

## Local Pages Function testing

For testing the live checker locally, copy the example env file and run the Pages dev command:

```bash
cp .dev.vars.example .dev.vars
# fill in the real values before running

yarn pages:dev
```

The file `.dev.vars` is git-ignored. Production secrets should live in the Cloudflare Pages dashboard as encrypted environment variables, not in source control.

## Deployment

This project is designed for Cloudflare Pages.

### Recommended setup

1. Push the repo to GitHub.
2. In Cloudflare Pages, connect the repo and create a Pages project.
3. Use these build settings:
   - Framework preset: Gatsby or None
   - Build command: `yarn build`
   - Output directory: `public`
4. Set the Node version to match the repo settings (`.nvmrc` and `package.json` define the expected engine).

### Production URL config

The production site URL is set in `gatsby-config.ts`:

```ts
const siteUrl = "https://dokidokiboii.tv";
```

Update it whenever the live domain changes so canonical URLs, OG metadata, and sitemap output remain correct.

## Notes

- This is a mostly static site, so rebuilds are the main way to regenerate pages and metadata.
- The design system lives in `src/styles/tokens.css`.
- Placeholder image and link content should be replaced before launch.
- The splash screen and other enhancements are client-side and intentionally designed not to interfere with SEO.
