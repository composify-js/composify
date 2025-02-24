import { Catalog } from '@composify/core';
import { ComponentProps } from 'react';
import { Stack } from '../Stack';
import { Editor } from './Editor';

const Text = () => <p>Hello world!</p>;

Catalog.register<ComponentProps<typeof Text>>('Text', {
  component: Text,
  props: {},
});

Catalog.register<ComponentProps<typeof Stack>>('Stack', {
  component: Stack,
  props: {
    children: {
      label: 'Children',
      type: 'node',
    },
    direction: {
      label: 'Direction',
      type: 'radio',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
      default: 'horizontal',
    },
    width: {
      label: 'Width',
      type: 'text',
      default: '100%',
    },
    height: {
      label: 'Height',
      type: 'number',
      default: 96,
    },
    backgroundColor: {
      label: 'Background',
      type: 'text',
      default: 'lightgray',
    },
  },
});

export const BasicUsage = () => {
  const source = `
    <Stack direction="vertical">
      <Stack direction="horizontal" backgroundColor="#ECEFF1">
        <Stack width={200} height={100} backgroundColor="#E1F5FE" />
        <Text />
        <Stack width={150} height={100} backgroundColor="#B3E5FC" />
      </Stack>
      <Stack direction="horizontal" backgroundColor="#CFD8DC">
        <Stack width={100} height={100} backgroundColor="#81D4FA" />
      </Stack>
      <Stack direction="horizontal" backgroundColor="#B0BEC5" />
    </Stack>
  `;

  return <Editor source={source} />;
};
