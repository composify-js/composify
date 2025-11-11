import { Catalog } from '@composify/react/renderer';
import { CodeSnippet } from './CodeSnippet';

Catalog.register('CodeSnippet', {
  component: CodeSnippet,
  category: 'Content',
  props: {
    language: {
      label: 'Language',
      type: 'text',
      default: 'tsx',
    },
    content: {
      label: 'Content',
      type: 'select',
      options: [
        { label: 'Drop-in Integration', value: 'dropInIntegration' },
        { label: 'JSX Everywhere', value: 'jsxEverywhere' },
      ],
      default: 'dropInIntegration',
    },
  },
});
