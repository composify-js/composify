import { Catalog } from '@composify/react/renderer';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';
import { Caption } from './Caption';

Catalog.register('Caption', {
  component: Caption,
  category: 'Content',
  props: {
    align: {
      label: 'Text Align',
      type: 'radio',
      options: [
        { label: <AlignLeftIcon />, value: 'left' },
        { label: <AlignCenterIcon />, value: 'center' },
        { label: <AlignRightIcon />, value: 'right' },
      ],
      default: 'left',
    },
    children: {
      label: 'Text',
      type: 'textarea',
      default: 'Caption',
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
