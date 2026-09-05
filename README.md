# Yuanfei (Cheyenne) Hu — Research Website

A static, responsive research portfolio designed for GitHub Pages. It uses plain HTML, CSS, and JavaScript: no database, API keys, server runtime, or build step is required.

## Preview locally

From the repository root:

```bash
python3 -m http.server 8000 --directory dist
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a public repository. Use `Yuanfei-Hu.github.io` for the root URL `https://yuanfei-hu.github.io/`, or use any other repository name for a project URL.
2. Upload this repository and push to `main`.
3. In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. The included workflow deploys `dist/` automatically on every push to `main`.

The site uses relative asset links and therefore works from either a user site or a project subpath.

## Common edits

| Change | File |
| --- | --- |
| Project details and dialog copy | `dist/data/content.js` |
| Homepage copy and section order | `dist/index.html` |
| Life-gallery copy | `dist/life.html` |
| Colors, typography, spacing, responsive rules | `dist/assets/css/site.css` |
| Interactions and simulations | `dist/assets/js/site.js` |
| CV | Replace `dist/assets/docs/Yuanfei_Cheyenne_Hu_CV.pdf` with the same filename |
| Portrait | Replace `dist/assets/images/yuanfei-portrait.webp` with the same filename |

## Add photographs

1. Export images as `.webp` (roughly 1800–2400 px on the long edge, quality 75–85).
2. Add them under `dist/assets/images/gallery/`.
3. Add each record to the `gallery` array in `dist/data/content.js`:

```js
{
  src: "./assets/images/gallery/bromo-01.webp",
  alt: "Morning light over Mount Bromo",
  location: "East Java",
  year: "2026",
  caption: "Before the caldera woke",
  camera: ""
}
```

The gallery and full-screen viewer will appear automatically. Until then, the website deliberately shows a neutral empty state—no stock or generated personal imagery.

## Add an output or link

Copy an existing item in the `#outputs` section of `dist/index.html`. Include only buttons with real URLs. A future Google Scholar link should remain hidden until its public profile URL is available.

## Accessibility and performance

- Semantic headings, keyboard-operable navigation, visible focus states, and skip link
- Touch alternatives for hover interactions
- Reduced-motion support and fully readable content without animation
- Device-pixel-ratio-capped canvases and no heavy 3D library
- Lazy-loaded portrait and future gallery images
- Conventional navigation alongside the conceptual brain map

See [DESIGN.md](./DESIGN.md) for the full design system.
