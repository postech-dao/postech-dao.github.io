# PDAO - Postech DAO

https://dao.postech.ac.kr

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm build                         # Build site into dist/
miniserve --index index.html dist  # Serve locally
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm build` | Full build: copy sources + vendor + fonts + fetch data → `dist/` |
| `pnpm fetch-data` | Fetch Google Sheets + Medium RSS → `dist/assets/data/` |
| `pnpm lint` | Check lint + format (no changes) |
| `pnpm lint:fix` | Auto-fix lint + format issues |
| `pnpm format` | Format all files |
| `pnpm ci` | CI mode lint check (exits non-zero on violations) |

## CI/CD

- **CI** (`.github/workflows/ci.yml`): PR/push → Biome lint + format check
- **Build & Deploy** (`.github/workflows/build-deploy.yml`): push to main + every 6 hours (cron) → build → deploy to GitHub Pages

## Architecture

Static site with build-time data fetching. No runtime external API calls.

```
Source (HTML/CSS/JS)
  + pnpm vendor libs (i18next, Three.js, Roboto fonts)
  + fetched data (Google Sheets CSV, Medium RSS)
  → dist/  (deployed to GitHub Pages)
```
