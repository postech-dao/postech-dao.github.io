# Repository Guidance

## Current architecture
- This repository now uses **SvelteKit + `@sveltejs/adapter-static`** at the repo root.
- Main source lives in:
  - `src/routes/` — pages/layout/load functions
  - `src/lib/components/` — reusable Svelte UI
  - `src/lib/data/` — static typed content/data
  - `src/lib/legacy/` — small imperative browser helpers still in use
  - `static/` — images, locales, generated JSON data
  - `scripts/` — TypeScript preparation/fetch scripts run before build/check/test
- Build output is `build/` and should be treated as generated output.

## Working rules
- Prefer **TDD + Tidy First**.
- Keep component/data boundaries clear; do not reintroduce full-page raw HTML rendering.
- Prefer typed data modules over large inline markup blobs.
- Use pnpm scripts from the repo root:
  - `pnpm run check`
  - `pnpm test`
  - `pnpm run build`
  - `pnpm run lint`
- If you change generated/static data behavior, update `scripts/fetch-data.ts` and verify offline fallback behavior.
- If you change asset/base-path behavior, verify `PUBLIC_BASE_PATH` compatibility.
- Do not manually edit `build/`.

## Quality expectations
- Run fresh `check`, `test`, `build`, and diagnostics before claiming completion.
- Keep diffs reviewable.
- Remove superseded legacy files rather than keeping parallel dead paths.
