import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';
import { Catalog } from '../../renderer';
import { Text } from './Text';

Catalog.register('Text', {
  component: Text,
  category: 'Content',
  props: {
    children: {
      label: 'Content',
      type: 'textarea',
      default: 'Text',
    },
    color: {
      label: 'Color',
      type: 'text',
      default: '#1E1E1E',
    },
    size: {
      label: 'Size',
      type: 'select',
      options: [
        {
          label: 'xs',
          value: 'xs',
        },
        {
          label: 'sm',
          value: 'sm',
        },
        {
          label: 'md',
          value: 'md',
        },
        {
          label: 'lg',
          value: 'lg',
        },
        {
          label: '2xl',
          value: '2xl',
        },
        {
          label: '3xl',
          value: '3xl',
        },
        {
          label: '4xl',
          value: '4xl',
        },
        {
          label: '5xl',
          value: '5xl',
        },
        {
          label: '6xl',
          value: '6xl',
        },
      ],
      default: 'md',
    },
    weight: {
      label: 'Weight',
      type: 'select',
      options: [
        { label: 'thin', value: 'thin' },
        { label: 'extralight', value: 'extralight' },
        { label: 'light', value: 'light' },
        { label: 'normal', value: 'normal' },
        { label: 'medium', value: 'medium' },
        { label: 'semibold', value: 'semibold' },
        { label: 'bold', value: 'bold' },
        { label: 'extrabold', value: 'extrabold' },
        { label: 'black', value: 'black' },
      ],
      default: 'normal',
    },
    align: {
      label: 'Align',
      type: 'radio',
      options: [
        {
          label: <AlignLeftIcon />,
          value: 'left',
        },
        {
          label: <AlignCenterIcon />,
          value: 'center',
        },
        {
          label: <AlignRightIcon />,
          value: 'right',
        },
      ],
      default: 'left',
    },
    level: {
      label: 'Level',
      type: 'select',
      options: [
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
        {
          label: '4',
          value: 4,
        },
        {
          label: '5',
          value: 5,
        },
        {
          label: '6',
          value: 6,
        },
      ],
      optional: true,
    },
  },
});
