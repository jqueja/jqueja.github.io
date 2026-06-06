# jqueja.github.io — migrated to Vite + React

This repo was migrated so the site now lives in the repository root and is runnable using Vite + React.

Quick start:

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

The site files were taken from the previous `new/` folder and wired into a minimal Vite + React scaffold. The `new/` directory has been removed and the site now exists at the repository root. The site currently preserves the original static markup and styles; React has been added and mounted with a small indicator component to confirm it's running.

Next steps:

- Convert the static markup into React components in `src/` (optional).
- Integrate `script.js` behaviors into React (optional).

To build for production and deploy to GitHub Pages (uses the `gh-pages` package):

```bash
npm run build
npm run deploy
```

Note: the `deploy` script publishes the `dist` folder to the `gh-pages` branch. For a user/organization site (username.github.io) you can instead configure GitHub Pages to serve from the `gh-pages` branch or change the workflow to publish to the `main` branch root. Tell me which behavior you prefer and I can adjust.
