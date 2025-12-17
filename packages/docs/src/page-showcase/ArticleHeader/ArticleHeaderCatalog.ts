import { Catalog } from '@composify/react/renderer';
import { ArticleHeader } from './ArticleHeader';

Catalog.register('ArticleHeader', {
  component: ArticleHeader,
  category: 'Showcase / Article',
  props: {
    date: {
      label: 'Date',
      type: 'text',
      placeholder: 'Dec 10, 2024',
    },
    readTime: {
      label: 'Read Time',
      type: 'text',
      placeholder: '5 min read',
    },
    title: {
      label: 'Title',
      type: 'text',
      default: 'Article Title',
    },
    excerpt: {
      label: 'Excerpt',
      type: 'text',
      placeholder: 'A brief summary of the article...',
    },
  },
});
