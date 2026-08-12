# Koushik Swaminathan — Academic Website

Source for a statically generated academic website hosted with GitHub Pages.

## Local development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

The static site is generated in `out/`. Pushing to the `main` branch deploys
that directory automatically through the included GitHub Pages workflow.

## Content

- General site content and page visibility: `data/site-config.ts`
- Notes: `data/notes.ts`
- Public files such as the CV and figures: `public/`

The temporary demonstration notes can be replaced or removed before launch.
