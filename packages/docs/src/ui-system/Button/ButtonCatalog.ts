import { Catalog } from '@composify/react/renderer';
import { Button } from './Button';

Catalog.register('Button', {
  component: Button,
  category: 'Action',
  props: {
    variant: {
      label: 'Variant',
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Outline', value: 'outline' },
      ],
      default: 'primary',
    },
    size: {
      label: 'Size',
      type: 'select',
      options: [
        { label: 'Extra Small', value: 'xs' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
      default: 'md',
    },
    asChild: {
      label: 'As Child',
      type: 'boolean',
      default: false,
      optional: true,
    },
    children: {
      label: 'Content',
      type: 'text',
      default: 'Button',
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
