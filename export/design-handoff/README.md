# Cube Financial Group — design handoff export

Use this folder to inspect the live site structure in another tool (Figma Dev Mode, html.to.design, Anima, Locofy, VS Code, etc.).

## What’s included

| Path | Purpose |
|------|---------|
| `design-tokens.css` | Brand colors, fonts (CSS variables) |
| `homepage-static.html` | Single-file RTL homepage (semantic HTML + token CSS, no build) |
| `site-map.json` | Routes, components, content file map |
| `src/` | Full copy of `src/` (all TSX/CSS) |
| `content/` | Full copy of `content/` (all JSON copy) |

## Import tips by tool

- **Figma / html.to.design**: Open `homepage-static.html` in browser, or import URL `http://localhost:3001` while `npm run dev` runs.
- **Code ↔ design compare**: Point tool at `src/components/` and `content/homepage/`.
- **Comments in Figma**: Link frames to sections using `site-map.json` section IDs (`#founder`, `#dimensions`, etc.).

## Live dev URL

```
http://localhost:3001
```

```bash
cd "C:\Cube Financial Group"
npm run dev
```

## Stack note

Production UI is **Next.js 15 + Tailwind v4**. Class names in TSX (e.g. `bg-cube-navy`) map to tokens in `design-tokens.css`. Tailwind is not compiled in `homepage-static.html` — that file uses plain CSS equivalents for inspection only.
