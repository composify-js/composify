import { Catalog } from '@composify/react/renderer';
import {
  AlignCenterVerticalIcon,
  AlignEndVerticalIcon,
  AlignStartVerticalIcon,
  AlignVerticalJustifyCenterIcon,
  AlignVerticalJustifyEndIcon,
  AlignVerticalJustifyStartIcon,
  AlignVerticalSpaceAroundIcon,
  AlignVerticalSpaceBetweenIcon,
  StretchHorizontalIcon,
} from 'lucide-react';
import { VStack } from './VStack';

Catalog.register('VStack', {
  component: VStack,
  category: 'Layout',
  props: {
    alignHorizontal: {
      group: 'Layout',
      label: 'Align',
      type: 'radio',
      options: [
        { value: 'stretch', label: <StretchHorizontalIcon /> },
        { value: 'start', label: <AlignStartVerticalIcon /> },
        { value: 'center', label: <AlignCenterVerticalIcon /> },
        { value: 'end', label: <AlignEndVerticalIcon /> },
      ],
      default: 'stretch',
    },
    alignVertical: {
      group: 'Layout',
      label: 'Distribute',
      type: 'radio',
      options: [
        { value: 'start', label: <AlignVerticalJustifyStartIcon /> },
        { value: 'center', label: <AlignVerticalJustifyCenterIcon /> },
        { value: 'end', label: <AlignVerticalJustifyEndIcon /> },
        { value: 'between', label: <AlignVerticalSpaceBetweenIcon /> },
        { value: 'around', label: <AlignVerticalSpaceAroundIcon /> },
      ],
      default: 'start',
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
    children: {
      label: 'Children',
      type: 'node',
    },
  },
});
