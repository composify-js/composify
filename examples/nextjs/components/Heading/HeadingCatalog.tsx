import { Catalog } from '@composify/react/renderer';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';
import { Heading } from './Heading';

Catalog.register('Heading', {
  component: Heading,
  category: 'Content',
  props: {
    level: {
      label: 'Level',
      type: 'select',
      options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
      ],
      default: 1,
    },
    size: {
      label: 'Size',
      type: 'select',
      options: [
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
        { label: '2XL', value: '2xl' },
        { label: '3XL', value: '3xl' },
        { label: '4XL', value: '4xl' },
        { label: '5XL', value: '5xl' },
      ],
      default: '3xl',
    },
    weight: {
      label: 'Font Weight',
      type: 'select',
      options: [
        { label: 'Semibold', value: 'semibold' },
        { label: 'Bold', value: 'bold' },
        { label: 'Extrabold', value: 'extrabold' },
      ],
      default: 'bold',
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
      default: 'Heading',
    },
  },
});
