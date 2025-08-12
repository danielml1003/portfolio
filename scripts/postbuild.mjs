// Create 404.html for SPA routing on static hosts (Netlify, GitHub Pages, etc.)
// Copies build/client/index.html to build/client/404.html after build.
import { copyFile, access, constants } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const src = resolve(root, 'build', 'client', 'index.html');
const dest = resolve(root, 'build', 'client', '404.html');

try {
  await access(src, constants.F_OK);
  await copyFile(src, dest);
  console.log('postbuild: created build/client/404.html');
} catch (err) {
  console.warn('postbuild: index.html not found; did the build succeed?', err?.message || err);
}
