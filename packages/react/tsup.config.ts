import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
  entry: ['src/index.ts', 'src/editor/index.ts', 'src/renderer/index.ts', 'src/utils/index.ts'],
  outDir: 'dist',
  sourcemap: true,
  dts: true,
  external: [
    '@monaco-editor/react',
    'acorn',
    'acorn-jsx',
    'css-box-model',
    'es-toolkit',
    'prettier',
    'react-dnd',
    'react-dnd-html5-backend',
    'react-element-to-jsx-string',
    'tamagui',
  ],
  loader: {
    '.css': 'local-css',
  },
});
