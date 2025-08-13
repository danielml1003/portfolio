# Portfolio

[Live Demo](https://danielml1003.github.io/portfolio/)

A personal portfolio built with React Router, Vite, TypeScript, and TailwindCSS.

## Development

- Install deps: `npm ci`
- Run dev server: `npm run dev`
- Typecheck: `npm run typecheck`

## Build

SPA mode is enabled (`ssr: false`). The static site is output to `build/client`.

- Build: `npm run build`
- Postbuild creates `build/client/404.html` for SPA routing on static hosts.

## Deploy (GitHub Pages)

This repo includes a GitHub Actions workflow that builds and deploys to Pages on pushes to `main`.

- Workflow: `.github/workflows/deploy-pages.yml`
- Vite `base` is set from `BASE_PATH` to support project sites like `/portfolio/`.
- Your site will be available at: https://danielml1003.github.io/portfolio/

## Notes

- Contact form uses `mailto:` so it works on static hosting.
- Tailwind CSS v4 via `@tailwindcss/vite`.
