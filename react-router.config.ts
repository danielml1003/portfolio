import type { Config } from "@react-router/dev/config";

// Use BASE_PATH for both asset URLs (via Vite) and router basename.
// On GitHub Pages for a project site this will be "/<repo-name>/" (e.g. "/portfolio/").
const BASENAME = process.env.BASE_PATH || "/";

export default {
  // Disable SSR for static SPA builds (Option C)
  ssr: false,
  // Ensure the router strips the project subpath so routes match at "/".
  basename: BASENAME,
} satisfies Config;
