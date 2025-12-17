import { Catalog } from '@composify/react/renderer';
import { BlogPostList } from './BlogPostList';

Catalog.register('BlogPostList', {
  component: BlogPostList,
  category: 'Showcase / Blog',
  props: {
    title: {
      label: 'Title',
      type: 'text',
      default: 'From the blog',
    },
    description: {
      label: 'Description',
      type: 'text',
      default: 'Latest posts and insights',
    },
    columns: {
      label: 'Columns',
      type: 'select',
      options: [
        { label: '1 Column', value: 1 },
        { label: '2 Columns', value: 2 },
        { label: '3 Columns', value: 3 },
      ],
      default: 2,
    },
    posts: {
      label: 'Posts',
      type: 'array',
      item: {
        label: 'Post',
        type: 'object',
        fields: {
          date: {
            label: 'Date',
            type: 'text',
            default: 'Dec 10, 2024',
          },
          readTime: {
            label: 'Read Time',
            type: 'text',
            default: '5 min read',
          },
          title: {
            label: 'Title',
            type: 'text',
            default: 'Post Title',
          },
          excerpt: {
            label: 'Excerpt',
            type: 'text',
            default: 'Post excerpt goes here.',
          },
          href: {
            label: 'Link',
            type: 'text',
            default: '#',
          },
        },
      },
      default: [
        {
          date: 'Dec 10, 2024',
          readTime: '5 min read',
          title: 'How to reduce churn with cohort analysis',
          excerpt: 'Learn how leading SaaS companies use cohort analysis to identify at-risk users.',
          href: '#',
        },
      ],
    },
  },
});
