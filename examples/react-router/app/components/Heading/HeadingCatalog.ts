import { Catalog } from '@composify/react/renderer';
import { Heading } from './Heading';

Catalog.register('Heading', {
  component: Heading,
  props: {
    level: {
      label: 'Heading Level',
      type: 'select',
      options: [
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
        {
          label: '4',
          value: 4,
        },
        {
          label: '5',
          value: 5,
        },
        {
          label: '6',
          value: 6,
        },
      ],
      default: 1,
    },
    weight: {
      label: 'Font Weight',
      type: 'select',
      options: [
        {
          label: 'Semibold',
          value: 'semibold',
        },
        {
          label: 'Bold',
          value: 'bold',
        },
        {
          label: 'Extrabold',
          value: 'extrabold',
        },
      ],
      default: 'extrabold',
    },
    children: {
      label: 'Content',
      type: 'text',
      default: 'Server Driven UI made easy',
    },
  },
});
