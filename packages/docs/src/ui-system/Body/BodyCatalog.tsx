import { Catalog } from '@composify/react/renderer';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';
import { Body } from './Body';

Catalog.register('Body', {
  component: Body,
  category: 'Content',
  props: {
    size: {
      label: 'Size',
      type: 'select',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
        { label: '2XL', value: '2xl' },
        { label: '3XL', value: '3xl' },
        { label: '4XL', value: '4xl' },
      ],
      default: 'md',
    },
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
      default: 'Body',
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
