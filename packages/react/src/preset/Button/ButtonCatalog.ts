import { Catalog } from '../../renderer';
import { Button } from './Button';

Catalog.register('Button', {
  component: Button,
  props: {
    variant: {
      label: 'Variant',
      type: 'radio',
      options: [
        {
          label: 'Primary',
          value: 'primary',
        },
        {
          label: 'Secondary',
          value: 'secondary',
        },
        {
          label: 'Outline',
          value: 'outline',
        },
      ],
      default: 'primary',
    },
    size: {
      label: 'Size',
      type: 'radio',
      options: [
        {
          label: 'Extra Small',
          value: 'xs',
        },
        {
          label: 'Small',
          value: 'sm',
        },
        {
          label: 'Medium',
          value: 'md',
        },
      ],
      default: 'md',
    },
    children: {
      label: 'Children',
      type: 'text',
      default: 'Button',
    },
  },
});
