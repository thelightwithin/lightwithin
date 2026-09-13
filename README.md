# The Light Within — Akashic Records guidance & energy work

A static [Astro](https://astro.build) site styled after a Showit wellness template:
Cormorant Garamond + Hanken Grotesk, cream-on-dark with burgundy bands,
CSS-generated photographic scenes with film grain, scroll reveals, layered
parallax, inertial smooth scrolling, and arrow-driven carousels. Fully
responsive, with a full-screen mobile menu below 860px.

Deploys automatically to **GitHub Pages** on every push to `main`.

## Commands

```bash
npm install        # once
npm run dev        # local dev server (http://localhost:4321/lightwithin/)
npm run build      # production build to dist/
npm run preview    # preview the production build
```

## Editing content (no code required)

All copy lives in plain YAML and Markdown — components and CSS never need
to change for content edits.

| What | Where |
|---|---|
| Brand mark, nav, socials, handle, legal line, form endpoint | `src/data/site.yaml` |
| Home page copy (hero, statements, founders, CTA) | `src/data/home.yaml` |
| About / Services / Contact / Resources page copy | `src/data/about.yaml`, `services.yaml`, `contact.yaml`, `resources.yaml` |
| **Services** (carousel + detail sections) | `src/content/services/*.md` — one file per service |
| **Reviews** (rotating quotes) | `src/content/testimonials/*.md` — one file per quote |

To add a review, copy an existing file in `src/content/testimonials/`,
change the front-matter, and push. Same for services (set `order` for
position and `mood: m0|m1|m2` for the placeholder scene). Front-matter is
schema-validated (`src/content.config.ts`), so mistakes fail the build with
a clear message instead of silently breaking the site.

Fields marked `(html)` in the YAML files accept a little inline markup
(`<br>`, `<em>`, `<u>`) for the display-type styling.

## Signup form (Formspree)

The form posts client-side to Formspree — no backend needed on GitHub Pages.

1. Create a free form at [formspree.io](https://formspree.io).
2. Paste the endpoint into `src/data/site.yaml`:
   ```yaml
   formEndpoint: "https://formspree.io/f/xxxxyyyy"
   ```

Until then, the form tells visitors signups aren't open yet.
(Any service accepting a JSON POST of `{name, email}` works — e.g.
Web3Forms or Buttondown — just swap the URL.)

## Customer reviews

Customers leave reviews at `/contact/#review` (name, session type,
star rating, message, and a publish-consent checkbox). A "Leave a
review" link under the testimonials rotator points there.

Reviews are **moderated by design** — nothing appears on the site
automatically:

1. A submitted review arrives in your Formspree inbox/email
   (`reviewEndpoint` in `src/data/site.yaml`, falling back to
   `formEndpoint` when empty).
2. To publish one, add a markdown file to `src/content/testimonials/`
   (copy an existing file, paste the quote, set `order`) and push.
   It joins the rotating Testimonials band on the next deploy.

This keeps spam and off-brand comments off the site with zero
third-party widgets.

## Deploying to GitHub Pages

One-time setup:

1. Create a GitHub repo named `lightwithin` and push this folder to `main`.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. In `astro.config.mjs`, set `SITE` to `https://thelightwithin.github.io`.

Every push to `main` then builds and deploys via
`.github/workflows/deploy.yml`. If you rename the repo, update `BASE` in
`astro.config.mjs` to `'/<new-repo-name>'` — all internal links follow it.

## Brand font (FS Me)

The header wordmark is set in **FS Me**, a commercial typeface licensed
by Fontsmith/Monotype — the font files are NOT included in this repo.
Once you have a webfont license, drop the files into `public/fonts/` as:

```
public/fonts/FSMe-Regular.woff2
public/fonts/FSMe-Bold.woff2
```

The wordmark picks them up automatically (`@font-face` in
`src/styles/global.css`); until then it falls back to Hanken Grotesk.

## Replacing the placeholder imagery

Every "photo" is a CSS gradient scene (see `src/styles/global.css`:
`.hero-bg`, `.show-img.m0/.m1/.m2`, `.about-right`, `.float-tile`, `.t1–.t6`).
To use real photography, drop images into `public/images/` and replace the
gradient `background` declarations with `background:url(...) center/cover` —
the grain overlays, reveals, and parallax keep working unchanged.

## Project layout

```
src/
├─ data/            ← YAML site config + per-page copy (edit freely)
├─ content/         ← Markdown collections: services, testimonials (reviews)
├─ styles/global.css← design tokens, motion system, section styles
├─ scripts/motion.js← reveals, parallax, starfields, smooth scroll
├─ layouts/         ← BaseLayout (fonts, header, footer, motion)
├─ components/      ← one component per section
└─ pages/           ← index, about, offerings, contact
```

`nova-style-site.html` at the repo root is the original single-file
design reference this project was converted from; it is not published.
