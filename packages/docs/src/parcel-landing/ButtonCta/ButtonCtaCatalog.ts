import { Catalog } from '@composify/react/renderer';
import { ButtonCta } from './ButtonCta';

Catalog.register('ButtonCta', {
  component: ButtonCta,
  category: 'Landing',
  props: {
    href: {
      label: 'To',
      type: 'text',
      default: '/',
    },
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
      ],
      default: 'lg',
    },
    children: {
      label: 'Text',
      type: 'text',
      default: 'CTA',
    },
  },
});
