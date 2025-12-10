import { Catalog } from '@composify/react/renderer';
import { Heading } from './Heading';

Catalog.register('Heading', {
  component: Heading,
  category: 'Content',
  props: {
    size: {
      label: 'Size',
      type: 'select',
      options: [
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
        { label: '2XL', value: '2xl' },
        { label: '3XL', value: '3xl' },
        { label: '4XL', value: '4xl' },
        { label: '5XL', value: '5xl' },
      ],
      default: 'lg',
    },
    weight: {
      label: 'Font Weight',
      type: 'select',
      options: [
        { label: 'Semibold', value: 'semibold' },
        { label: 'Bold', value: 'bold' },
        { label: 'Extrabold', value: 'extrabold' },
      ],
      default: 'semibold',
    },
    children: {
      label: 'Content',
      type: 'textarea',
      default: 'Heading',
    },
  },
});
