# Shared Intelligence

**Practical AI resources for busy people.**

A free, jargon-free educational site for everyday professionals who want to get real value from AI.

Live at: [sharedintelligence.co](https://sharedintelligence.co)

---

## What's inside

| Page | What it does |
|---|---|
| **Home** | Overview and entry point |
| **Start Here** | First-stop orientation for new visitors |
| **Crash Course** | Primer covering how AI works, how to prompt, and what to watch out for |
| **Deep Dive** | Technical articles on LLMs, tokens, transformers, RAG, and agents |
| **Projects** | Hands-on exercises from beginner to advanced |
| **Prompt Library** | Copy-paste prompt templates organised by use case |
| **Field Guides** | Longer how-to guides for specific workflows |
| **Tools** | Curated directory of AI tools, organised by category |
| **Glossary** | Plain-English definitions of common AI terms |
| **FAQ** | Honest answers to real questions (privacy, cost, where to start) |
| **About** | Background on why this exists |
| **Changelog** | Running log of what's shipped |

---

## Who it's for

Program managers, operations leaders, and knowledge workers who keep hearing about AI and want to use it — not just read about it. The site is written from the perspective of someone who's spent two years training colleagues on AI inside large organisations (Meta, Amazon), not from a research lab.

---

## Tech stack

- Plain HTML, CSS, and vanilla JavaScript — no framework, no build step
- [Tailwind CSS](https://tailwindcss.com) via CDN
- [Google Fonts](https://fonts.google.com) (Playfair Display, Lora, Courier Prime)
- Hosted on GitHub Pages with a custom domain (`CNAME` → `sharedintelligence.co`)

---

## Running locally

No build tools required. Clone the repo and open any `.html` file in a browser:

```bash
git clone https://github.com/thodenny/shared-intelligence.git
cd shared-intelligence
open index.html
```

Or serve it with any static file server:

```bash
npx serve .
```

---

## Project structure

Each section lives in its own folder with an `index.html`, so URLs are extensionless (e.g. `/crash-course/`). Shared assets sit at the root and are referenced via absolute paths so they resolve from any depth.

```
shared-intelligence/
├── index.html              # Home
├── styles.css              # Shared styles (loaded as /styles.css)
├── scripts.js              # Shared client behavior (loaded as /scripts.js)
├── CNAME                   # Custom domain for GitHub Pages
├── favicon.*               # Favicons + apple-touch-icon
├── start-here/index.html
├── crash-course/index.html
├── deep-dive/index.html
├── projects/index.html
├── prompt-library/index.html
├── field-guides/index.html
├── tools/index.html
├── glossary/index.html
├── faq/index.html
├── about/index.html
├── changelog/index.html
└── guides/                 # Long-form guides + downloadable PDFs
    └── teach-claude-your-voice/index.html
```

---

## Principles

- **Free.** No paywall, no newsletter gate, no referral codes.
- **Honest.** Limitations and trade-offs are called out, not buried.
- **Practical.** Everything on here should be immediately usable.
- **No tracking.** No analytics scripts, no cookies, no data collection.

---

*Built by [Thomas Denny](https://github.com/thodenny)*
