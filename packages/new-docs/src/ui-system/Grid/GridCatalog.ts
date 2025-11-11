import { Catalog } from '@composify/react/renderer';
import { Grid } from './Grid';

Catalog.register('Grid', {
  component: Grid,
  category: 'Content',
  props: {
    columns: {
      label: 'Columns',
      type: 'radio',
      options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
      ],
      optional: true,
      default: 2,
    },
    rows: {
      label: 'Rows',
      type: 'radio',
      options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
      ],
      optional: true,
    },
    children: {
      label: 'Text',
      type: 'node',
    },
  },
});
