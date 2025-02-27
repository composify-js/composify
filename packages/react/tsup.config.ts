import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
  target: ['chrome51', 'firefox53', 'edge18', 'safari11', 'ios11', 'opera38', 'es6', 'node14'],
  entry: ['src/index.ts', 'src/editor/index.ts', 'src/preset/index.ts', 'src/renderer/index.ts'],
  outDir: 'dist',
  sourcemap: true,
  dts: true,
});
