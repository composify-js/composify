import { Catalog } from '../../renderer';
import { Button } from './Button';

Catalog.register('Button', {
  component: Button,
  category: 'Content',
  props: {
    variant: {
      label: 'Variant',
      type: 'select',
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
        {
          label: 'Ghost',
          value: 'ghost',
        },
      ],
      default: 'primary',
    },
    size: {
      label: 'Size',
      type: 'radio',
      options: [
        {
          label: 'S',
          value: 'sm',
        },
        {
          label: 'M',
          value: 'md',
        },
        {
          label: 'L',
          value: 'lg',
        },
      ],
      default: 'md',
    },
    children: {
      label: 'Text',
      type: 'text',
      default: 'Button',
    },
  },
});
