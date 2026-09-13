// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

// ─── GitHub Pages target ─────────────────────────────────────────────
// This site deploys as a *project page*:
//   https://thelightwithin.github.io/lightwithin/
//
// 1. SITE is your GitHub Pages origin (used for canonical URLs).
// 2. BASE is the repository path for project pages.
//    Every internal link and asset already respects this automatically.
const SITE = 'https://thelightwithin.github.io';
const BASE = '/lightwithin';

export default defineConfig({
  site: SITE,
  base: BASE,
  vite: {
    plugins: [yaml()],
  },
});
