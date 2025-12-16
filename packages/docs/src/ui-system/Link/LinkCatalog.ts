import { Catalog } from '@composify/react/renderer';
import { Link } from './Link';

Catalog.register('Link', {
  component: Link,
  category: 'Action',
  props: {
    href: {
      label: 'URL',
      type: 'text',
      default: '#',
    },
    target: {
      label: 'Target',
      type: 'select',
      options: [
        { label: 'Same Tab', value: '_self' },
        { label: 'New Tab', value: '_blank' },
      ],
      default: '_self',
      optional: true,
    },
    plain: {
      label: 'Plain Style',
      type: 'boolean',
      default: false,
      optional: true,
    },
    children: {
      label: 'Content',
      type: 'node',
    },
    className: {
      label: 'Classes',
      type: 'array',
      item: {
        label: 'Class Name',
        type: 'text',
      },
      optional: true,
    },
  },
});
