/**
 * Prefix a site-absolute path ("/about/") with the configured `base`
 * so links work on a GitHub Pages project site
 * (e.g. https://user.github.io/medi-front/about/).
 *
 * Paths that don't start with "/" (external URLs, mailto:, #anchors)
 * pass through untouched.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return path.startsWith('/') ? base + path : path;
}
