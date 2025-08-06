import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
  target: ['chrome51', 'firefox53', 'edge18', 'safari11', 'ios11', 'opera38', 'es6', 'node14'],
  entry: ['src/*.{ts,tsx}', '!**/*.{spec,test,test-d}.*'],
  outDir: 'dist',
  external: ['acorn', 'acorn-jsx'],
  sourcemap: true,
  dts: true,
});
