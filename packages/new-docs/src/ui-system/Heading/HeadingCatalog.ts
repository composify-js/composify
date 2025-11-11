import { Catalog } from '@composify/react/renderer';
import { Heading } from './Heading';

Catalog.register('Heading', {
  component: Heading,
  category: 'Content',
  props: {
    level: {
      label: 'Level',
      type: 'select',
      options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
      ],
      default: 1,
    },
    size: {
      label: 'Size',
      type: 'select',
      options: [
        { label: 'XL', value: 'xl' },
        { label: '2XL', value: '2xl' },
        { label: '3XL', value: '3xl' },
        { label: '4XL', value: '4xl' },
        { label: '5XL', value: '5xl' },
      ],
      default: '3xl',
    },
    weight: {
      label: 'Font Weight',
      type: 'select',
      options: [
        {
          label: 'Bold',
          value: 'bold',
        },
        {
          label: 'Extra Bold',
          value: 'extrabold',
        },
      ],
      default: 'bold',
    },
    className: {
      label: 'Class Names',
      type: 'array',
      item: {
        label: 'Class Name',
        type: 'text',
      },
      optional: true,
    },
    children: {
      label: 'Text',
      type: 'textarea',
      default: 'Heading',
    },
  },
});
