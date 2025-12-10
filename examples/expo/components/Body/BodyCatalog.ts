import { Catalog } from '@composify/react/renderer';
import { Body } from './Body';

Catalog.register('Body', {
  component: Body,
  category: 'Content',
  props: {
    size: {
      label: 'Size',
      type: 'radio',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
      default: 'md',
    },
    align: {
      label: 'Alignment',
      type: 'radio',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      default: 'left',
    },
    children: {
      label: 'Content',
      type: 'textarea',
      default: 'Body',
    },
  },
});
