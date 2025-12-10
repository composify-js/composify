import { Catalog } from '@composify/react/renderer';
import { HStack } from './HStack';

Catalog.register('HStack', {
  component: HStack,
  category: 'Layout',
  props: {
    alignHorizontal: {
      group: 'Layout',
      label: 'Distribute',
      type: 'select',
      options: [
        { label: 'Start', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'end' },
        { label: 'Space Between', value: 'between' },
        { label: 'Space Around', value: 'around' },
      ],
      default: 'start',
    },
    alignVertical: {
      group: 'Layout',
      label: 'Align',
      type: 'select',
      options: [
        { label: 'Start', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'end' },
        { label: 'Stretch', value: 'stretch' },
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
    backgroundColor: {
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
