import {
  AlignCenterHorizontalIcon,
  AlignCenterVerticalIcon,
  AlignEndHorizontalIcon,
  AlignEndVerticalIcon,
  AlignStartHorizontalIcon,
  AlignStartVerticalIcon,
  StretchHorizontalIcon,
  StretchVerticalIcon,
} from 'lucide-react';
import { Catalog } from '../../renderer';
import { Grid } from './Grid';

Catalog.register('Grid', {
  component: Grid,
  category: 'Layout',
  props: {
    columns: {
      group: 'Layout',
      label: 'Columns',
      type: 'number',
      default: 2,
      optional: true,
    },
    rows: {
      group: 'Layout',
      label: 'Rows',
      type: 'number',
      optional: true,
    },
    alignItems: {
      group: 'Layout',
      label: 'Align Items',
      type: 'radio',
      options: [
        { value: 'stretch', label: <StretchVerticalIcon /> },
        { value: 'start', label: <AlignStartHorizontalIcon /> },
        { value: 'center', label: <AlignCenterHorizontalIcon /> },
        { value: 'end', label: <AlignEndHorizontalIcon /> },
      ],
      default: 'stretch',
    },
    justifyItems: {
      group: 'Layout',
      label: 'Justify Items',
      type: 'radio',
      options: [
        { value: 'stretch', label: <StretchHorizontalIcon /> },
        { value: 'start', label: <AlignStartVerticalIcon /> },
        { value: 'center', label: <AlignCenterVerticalIcon /> },
        { value: 'end', label: <AlignEndVerticalIcon /> },
      ],
      default: 'stretch',
    },
    gap: {
      group: 'Layout',
      label: 'Gap',
      type: 'number',
      optional: true,
    },
    width: {
      group: 'Size',
      label: 'Width',
      type: 'number',
      default: 100,
      optional: true,
    },
    height: {
      group: 'Size',
      label: 'Height',
      type: 'number',
      default: 100,
      optional: true,
    },
    padding: {
      group: 'Layout',
      label: 'Padding',
      type: 'object',
      fields: {
        top: {
          label: 'Top',
          type: 'number',
          default: 0,
        },
        right: {
          label: 'Right',
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
      },
      optional: true,
    },
    margin: {
      group: 'Layout',
      label: 'Margin',
      type: 'object',
      fields: {
        top: {
          label: 'Top',
          type: 'number',
          default: 0,
        },
        right: {
          label: 'Right',
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
      },
      optional: true,
    },
    background: {
      label: 'Background',
      type: 'text',
      default: '#EEEEEE',
      optional: true,
    },
    children: {
      label: 'Children',
      type: 'node',
    },
  },
});
