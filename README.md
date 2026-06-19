# Dad Wrapped 2026

A full-screen Father's Day story: ten playful Dad Wrapped cards followed by an interactive constellation of family memories.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite. The experience supports buttons, arrow keys, Enter, and horizontal swipes.

## Personalize it

1. Edit names, statistics, captions, the recurring phrase, and memories in `src/content/dadWrapped.ts`.
2. Add photos to `public/img/` using the filenames documented in `public/img/README.md`.
3. Replace every placeholder memory and image description before sharing.

Missing photos intentionally show graphic placeholders rather than broken image icons.

## Verify and build

```bash
npm test
npm run build
npm run preview
```

The `dist/` directory is a static site and can be deployed to Vercel, Netlify, GitHub Pages, or any static host.
