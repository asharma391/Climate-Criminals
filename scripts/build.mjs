import { build as viteBuild } from 'vite';
import { build } from 'esbuild';
await viteBuild();
await build({
  entryPoints: ['src/content/index.ts'],
  bundle: true,
  outfile: 'dist/content.js',
  format: 'iife',
  platform: 'browser',
  target: 'chrome120',
  minify: true,
});
