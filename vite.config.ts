import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // For GitHub Pages project sites, assets live under /<repo>/
  // Set BASE_PATH env (e.g., "/my-repo/") to rewrite asset URLs.
  base: process.env.BASE_PATH || "/",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
