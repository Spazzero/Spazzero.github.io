# Gerald Yuen: Personal Site

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

The source for [spazzero.github.io](https://spazzero.github.io), a portfolio,
résumé, and writing site built with [Next.js](https://nextjs.org/),
[React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and
[Tailwind CSS](https://tailwindcss.com/).

**[Visit the live site →](https://spazzero.github.io)**

## What is here

- A statically exported Next.js 16 site deployed to GitHub Pages.
- A responsive light/dark design system built from semantic CSS tokens.
- Markdown writing with drafts, RSS, and page metadata.
- A filterable résumé that still prints in full.
- Tests for components, content, metadata, and the final static export.

## Commands

```bash
npm run dev             # Start the development server
npm run format          # Format with Prettier and Biome
npm run lint            # Run Biome checks
npm run type-check      # Run TypeScript
npm test                # Run Vitest
npm run build           # Build the production static export
npm run verify-export   # Inspect the generated HTML and XML
npm run og              # Regenerate the share card
npm run og:check        # Verify the committed share card is current
```

CI checks formatting, linting, types, the share card, tests, the production
build, and the exported site on every pull request.

## Deploy

Pushes to `main` build the static export and publish it to GitHub Pages via
GitHub Actions. The repository is named `Spazzero.github.io`, so the site
serves from the root URL and needs no `basePath`.

Two values must agree when the URL changes:

- `SITE_URL` in `src/lib/utils.ts` — no trailing slash
- `homepage` in `package.json` — with a trailing slash

`public/robots.txt` also carries the sitemap URL and is not derived from either.

## License

The site architecture is MIT licensed and originates from
[mldangelo/personal-site](https://github.com/mldangelo/personal-site) by
Michael D'Angelo. That copyright is retained in [LICENSE](./LICENSE) as the
licence requires.

The written content, résumé data, and images in this repository are **not**
covered by that licence. They are mine, all rights reserved, and are published
here to be read on the site rather than reused. Please do not copy or
redistribute them. If you want the site architecture, take it from the upstream
project above, which is MIT licensed for exactly that purpose.
