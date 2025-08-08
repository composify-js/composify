import { Catalog } from '@composify/react/renderer';
import { Body } from './Body';

Catalog.register('Body', {
  component: Body,
  props: {
    color: {
      label: 'Text Color',
      type: 'text',
      default: '#1E1E1E',
    },
    weight: {
      label: 'Font Weight',
      type: 'radio',
      options: [
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'Normal',
          value: 'normal',
        },
      ],
      default: 'normal',
    },
    margin: {
      label: 'Margin',
      type: 'object',
      fields: {
        top: {
          label: 'Top',
          type: 'number',
          default: 0,
        },
        bottom: {
          label: 'Bottom',
          type: 'number',
          default: 0,
        },
        left: {
          label: 'Left',
          type: 'number',
          default: 0,
        },
        right: {
          label: 'Right',
          type: 'number',
          default: 0,
        },
      },
    },
  },
});
