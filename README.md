# Dust Chapel

Astro + TypeScript static blog optimized for images, lightbox galleries, and Markdown content.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:4321`.

## Build & deploy

```bash
npm run build
```

Static files are emitted to `dist/`. Sync that folder to your server or CDN.

## Adding a post

1. Create a new Markdown file in `src/content/posts/`.
2. Include frontmatter:

```yaml
---
title: "Post title"
slug: "post-title"
date: 2024-04-01
description: "Short summary for previews"
draft: false
heroImage: "../images/your-image.svg" # or image() path
heroImageAlt: "Descriptive alt text"
tags: [tag-one, tag-two]
ogImage: "../images/your-og.svg" # optional
canonicalUrl: "https://your-site.com/blog/post-title" # optional
order: 1 # optional manual ordering
---
```

3. Write using normal Markdown. Images are wrapped for the lightbox automatically. To group images into a gallery, add `gallery=<name>` in the Markdown image title, e.g.:

```markdown
![Bench light](../images/photo.jpg "gallery=hall Dust on the bench")
```

Drafts (`draft: true`) render locally but are excluded from production builds, RSS, sitemap, and pagination.

## Lightbox & galleries

- Any image in Markdown or the `LightboxImage`/`LightboxGallery` components opens in the lightbox.
- Images sharing the same `data-gallery` (or `gallery=` title metadata from Markdown) are grouped into a carousel.
- Use the provided `LightboxGallery` component in Astro templates for curated grids.

## Search

- A static `search-index.json` is generated at build time from posts.
- Client-side search lives in `SearchBox` and `SearchResults` components on the home page.

## Configuration

- Update `src/config/site.ts` with your real site URL, title, and defaults (required for sitemap and RSS).
- Styles live in `src/styles/` with Sass partials and CSS variables in `_variables.scss`.
- Global layout and meta live in `src/layouts/BaseLayout.astro`.

## Useful scripts

- `npm run dev` – local development with drafts visible.
- `npm run build` – production build (drafts hidden, RSS/sitemap generated).
- `npm run preview` – preview the production build locally.
