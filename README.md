# Cube Financial Group

Premium personal financial advisory website (Hebrew RTL).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Edit JSON files under `content/` — no need to change React components for copy updates.

- `content/homepage/` — homepage sections
- `content/solutions.json` — all solutions and categories
- `content/site.json` — contact details and SEO defaults

## Brand assets

Approved logos: `public/brand/`

- **Header icon:** `logo-icon.png` — transparent cube (source: `Logos/Icon Only Cube Transparent.png`)
- Re-run if missing: `npm run setup:brand` (prefers transparent icon)

If logos break after clone, run:

```bash
npm run setup:brand
```

Hero video: configured in `content/homepage/hero.json` (currently `public/20256026-uhd_3840_2160_24fps.mp4`).

- **Desktop:** autoplay loop (muted), dark overlay for text readability.
- **Mobile / reduced-motion:** static gradient (no large video download).
- **Optional poster:** add `public/brand/hero-poster.jpg` for faster first paint and mobile LCP.

**Production tip:** the source file is 4K (~47MB). Compress to 1080p (~5–8MB) with ffmpeg for faster loads:

```bash
ffmpeg -i public/20256026-uhd_3840_2160_24fps.mp4 -vf scale=1920:-2 -c:v libx264 -crf 23 -preset slow -an public/brand/hero.mp4
```

Then set `"src": "/brand/hero.mp4"` in `content/homepage/hero.json`.

## Founder

אריאל בר חיים — מייסד ומנהל מקצועי (`content/homepage/founder.json`)
