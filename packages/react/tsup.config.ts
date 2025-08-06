import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
  entry: ['src/index.ts', 'src/editor/index.ts', 'src/preset/index.ts', 'src/renderer/index.ts'],
  outDir: 'dist',
  sourcemap: true,
  dts: true,
  external: [
    '@monaco-editor/react',
    'css-box-model',
    'es-toolkit',
    'prettier',
    'react-dnd',
    'react-dnd-html5-backend',
    'react-element-to-jsx-string',
  ],
  loader: {
    '.css': 'local-css',
  },
});
