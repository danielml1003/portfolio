# daniel@baravik:~$ — the workstation

[Live Demo](https://danielml1003.github.io/portfolio/)

A terminal-native personal portfolio. No template — the whole identity is built
around a developer's working environment:

- **Boot sequence** — a fast, skippable fake boot log on first visit (once per session)
- **ASCII field hero** — a hand-rolled canvas renderer: value-noise driven ASCII
  characters that glow and ramp up around the cursor
- **README-style about** — line numbers, comments, and a fact sheet
- **neofetch skills panel** — system-specs layout with honest proficiency bars
- **Repo-card projects** — GitHub-style language bars and statuses
- **A real working terminal** — type `help`, `neofetch`, `cat about.md`,
  `sudo hire-me`… with command history (↑/↓) and a few easter eggs
- **Ctrl/Cmd+K command palette** — keyboard-first navigation
- **Editor status bar** — live Israel time, branch, open-to-work indicator

Built with React Router 7 (SPA mode), Vite, TypeScript, Tailwind CSS v4 and
Framer Motion. Respects `prefers-reduced-motion`; the canvas pauses offscreen.

## Development

- Install deps: `npm ci`
- Run dev server: `npm run dev`
- Typecheck: `npm run typecheck`

## Build

SPA mode is enabled (`ssr: false`). The static site is output to `build/client`.

- Build: `npm run build`
- Postbuild creates `build/client/404.html` for SPA routing on static hosts.

## Deploy (GitHub Pages)

This repo includes a GitHub Actions workflow that builds and deploys to Pages on
pushes to `main`.

- Workflow: `.github/workflows/deploy-gh-pages.yml`
- Vite `base` is set from `BASE_PATH` to support project sites like `/portfolio/`.
- Site: https://danielml1003.github.io/portfolio/

## Notes

- Contact form uses `mailto:` so it works on static hosting.
- Tailwind CSS v4 via `@tailwindcss/vite`; design tokens live in `app/app.css`.
- Project data lives in `app/data/projects.json`.
