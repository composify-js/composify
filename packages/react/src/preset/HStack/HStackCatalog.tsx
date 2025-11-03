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
import { Catalog } from '../../renderer';
import { HStack } from './HStack';

Catalog.register('HStack', {
  component: HStack,
  props: {
    alignHorizontal: {
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
      label: 'Flex',
      type: 'number',
      optional: true,
    },
    gap: {
      label: 'Gap',
      type: 'number',
      optional: true,
    },
    background: {
      label: 'Background',
      type: 'text',
      default: '#EEEEEE',
      optional: true,
    },
    size: {
      label: 'Size',
      type: 'object',
      fields: {
        width: {
          label: 'Width',
          type: 'number',
          default: 100,
          optional: true,
        },
        minWidth: {
          label: 'Min Width',
          type: 'number',
          optional: true,
        },
        maxWidth: {
          label: 'Max Width',
          type: 'number',
          optional: true,
        },
        height: {
          label: 'Height',
          type: 'number',
          default: 100,
          optional: true,
        },
        minHeight: {
          label: 'Min Height',
          type: 'number',
          optional: true,
        },
        maxHeight: {
          label: 'Max Height',
          type: 'number',
          optional: true,
        },
      },
      default: {
        width: 100,
        height: 100,
      },
      optional: true,
    },
    padding: {
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
    children: {
      label: 'Children',
      type: 'node',
    },
  },
});
