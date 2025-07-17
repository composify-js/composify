import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
  entry: ['src/index.ts', 'src/editor/index.ts', 'src/preset/index.ts', 'src/renderer/index.ts'],
  outDir: 'dist',
  sourcemap: true,
  dts: true,
  loader: {
    '.css': 'local-css',
  },
});
