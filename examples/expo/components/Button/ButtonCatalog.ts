import { Catalog } from '@composify/react/renderer';
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
          label: 'Outline',
          value: 'outline',
        },
      ],
      default: 'primary',
    },
    children: {
      label: 'Content',
      type: 'text',
      default: 'Learn More',
    },
  },
});
