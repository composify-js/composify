import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';
import { Catalog } from '../renderer';
import { Text } from '../ui/Text';

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
          label: 'Extra Small',
          value: 'xs',
        },
        {
          label: 'Small',
          value: 'sm',
        },
        {
          label: 'Medium',
          value: 'md',
        },
        {
          label: 'Large',
          value: 'lg',
        },
        {
          label: 'Extra Large',
          value: 'xl',
        },
        {
          label: '2 XL',
          value: '2xl',
        },
        {
          label: '3 XL',
          value: '3xl',
        },
        {
          label: '4 XL',
          value: '4xl',
        },
        {
          label: '5 XL',
          value: '5xl',
        },
        {
          label: '6 XL',
          value: '6xl',
        },
      ],
      default: 'md',
    },
    weight: {
      label: 'Weight',
      type: 'select',
      options: [
        { label: 'Thin', value: 'thin' },
        { label: 'Extra Light', value: 'extralight' },
        { label: 'Light', value: 'light' },
        { label: 'Normal', value: 'normal' },
        { label: 'Medium', value: 'medium' },
        { label: 'Semi Bold', value: 'semibold' },
        { label: 'Bold', value: 'bold' },
        { label: 'Extra Bold', value: 'extrabold' },
        { label: 'Black', value: 'black' },
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
    tracking: {
      label: 'Letter Spacing',
      type: 'select',
      options: [
        { label: 'Tighter', value: 'tighter' },
        { label: 'Tight', value: 'tight' },
        { label: 'Normal', value: 'normal' },
        { label: 'Wide', value: 'wide' },
        { label: 'Wider', value: 'wider' },
        { label: 'Widest', value: 'widest' },
      ],
      default: 'normal',
    },
    leading: {
      label: 'Line Height',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Tighter', value: 'tighter' },
        { label: 'Tight', value: 'tight' },
        { label: 'Snug', value: 'snug' },
        { label: 'Normal', value: 'normal' },
        { label: 'Relaxed', value: 'relaxed' },
        { label: 'Loose', value: 'loose' },
      ],
      default: 'normal',
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
