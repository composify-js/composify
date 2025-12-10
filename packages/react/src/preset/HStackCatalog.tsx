import {
  AlignCenterHorizontalIcon,
  AlignEndHorizontalIcon,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStartIcon,
  AlignHorizontalSpaceAroundIcon,
  AlignHorizontalSpaceBetweenIcon,
  AlignStartHorizontalIcon,
  StretchVerticalIcon,
} from 'lucide-react';
import { Catalog } from '../renderer';
import { HStack } from '../ui/HStack';

Catalog.register('HStack', {
  component: HStack,
  category: 'Layout',
  props: {
    alignHorizontal: {
      group: 'Layout',
      label: 'Align',
      type: 'radio',
      options: [
        { value: 'start', label: <AlignHorizontalJustifyStartIcon /> },
        { value: 'center', label: <AlignHorizontalJustifyCenterIcon /> },
        { value: 'end', label: <AlignHorizontalJustifyEndIcon /> },
        { value: 'between', label: <AlignHorizontalSpaceBetweenIcon /> },
        { value: 'around', label: <AlignHorizontalSpaceAroundIcon /> },
      ],
      default: 'start',
    },
    alignVertical: {
      group: 'Layout',
      label: 'Distribute',
      type: 'radio',
      options: [
        { value: 'stretch', label: <StretchVerticalIcon /> },
        { value: 'start', label: <AlignStartHorizontalIcon /> },
        { value: 'center', label: <AlignCenterHorizontalIcon /> },
        { value: 'end', label: <AlignEndHorizontalIcon /> },
      ],
      default: 'stretch',
    },
    flex: {
      group: 'Layout',
      label: 'Flex',
      type: 'number',
      optional: true,
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
