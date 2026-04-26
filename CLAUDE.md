# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Shared Intelligence — a free, jargon-free educational site about practical AI for non-technical professionals. Live at `sharedintelligence.co` (custom domain via `CNAME`), hosted on GitHub Pages.

## Stack & build

- Plain HTML, CSS, and vanilla JavaScript. **No framework, no build step, no package.json.**
- Tailwind CSS loaded via CDN (`cdn.tailwindcss.com`) and configured inline in each page's `<head>`.
- Google Fonts: Playfair Display (display), Lora (body), Courier Prime (mono).

## Running locally

Open any `index.html` in a browser, or serve the root statically:

```bash
npx serve .
```

There are no tests, lint, or build commands — changes go live by pushing to `main` (GitHub Pages deploys from the default branch).

## Architecture

### URL scheme: extensionless via folders

Every section is its own folder containing an `index.html` (e.g. `crash-course/index.html`, `prompt-library/index.html`). Internal links use trailing-slash extensionless URLs like `/crash-course/`, never `.html`. When adding a new section, create `<section-name>/index.html` — do **not** create top-level `<section-name>.html`.

(Note: `README.md`'s "Project structure" section is out of date and still lists the old flat `*.html` layout.)

### Shared assets at root

- `styles.css` — custom retro-zine styling on top of Tailwind (retro borders, dividers, nav, buttons, prompt cards, etc.).
- `scripts.js` — all shared client behavior in one file: nav active-state highlighting, Resources dropdown, prompt-library filter/search + copy buttons, glossary search + letter jumps, FAQ accordion, homepage changelog panel toggle.
- Favicons (`favicon.svg`, `favicon-32.png`, `favicon-512.png`, `favicon.ico`, `apple-touch-icon.png`).

All pages reference these via **absolute** paths (`/styles.css`, `/scripts.js`, `/favicon.svg`) so they resolve correctly from any folder depth.

### Per-page pattern

Each `index.html` is self-contained and repeats:
1. The same `<head>` block: meta, favicon links, `<title>`, Tailwind CDN + inline `tailwind.config` (custom colors `cream`/`rust`/`mustard`/`navy`/`parchment`/`charcoal` and font families), Google Fonts preconnect+stylesheet, `<link rel="stylesheet" href="/styles.css" />`.
2. The same `<nav>` block (navy bar with mustard accent, Resources dropdown). When adding a new top-level section, update the nav in **every** page.
3. Page-specific content.
4. `<script src="/scripts.js"></script>` near the end.

When editing styles or behavior that should apply site-wide, change `styles.css` / `scripts.js`. When changing the Tailwind theme tokens (colors, fonts), they must be updated in the inline `tailwind.config` of every page.

### JS conventions

`scripts.js` uses globals and inline `onclick=`/`onchange=` handlers (e.g. `setFilter(this)`, `toggleCard(this)`, `toggleFaq(this)`, `filterPrompts()`, `filterGlossary()`, `jumpToLetter('A')`, `scrollToArticle(id)`). New interactive components should follow the same pattern rather than introducing modules or a framework.

## Editorial principles (from README)

- Free, no paywall/newsletter gate/referral codes.
- Honest — limitations and trade-offs called out, not buried.
- Practical — everything immediately usable.
- No tracking — no analytics, no cookies, no data collection. Don't add any.
