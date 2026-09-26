// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

// ─── GitHub Pages target ─────────────────────────────────────────────
// GitHub Pages serves the custom domain from the root, so generated asset
// and internal-link paths must not retain the repository name.
const SITE = 'https://thelightwithin.io';
const BASE = '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  vite: {
    plugins: [yaml()],
  },
});
