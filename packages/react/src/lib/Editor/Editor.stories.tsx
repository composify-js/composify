import { Catalog } from '@composify/core';
import { ComponentProps } from 'react';
import { Stack } from '../Stack';
import { Editor } from './Editor';

Catalog.register<ComponentProps<typeof Stack>>('Stack', {
  component: Stack,
  props: {
    children: {
      label: 'Children',
      type: 'node',
    },
  },
});

export const BasicUsage = () => {
  const source = `
    <Stack>
      <Stack width={100} height={100} />
      <Stack width={100} height={100} />
      <Stack width={100} height={100} />
    </Stack>
  `;

  return <Editor source={source} />;
};
