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
    <Stack direction="vertical">
      <Stack direction="horizontal" backgroundColor="lightgray">
        <Stack width={100} height={100} backgroundColor="darkgray" />
        <Stack width={100} height={100} backgroundColor="white" />
      </Stack>
      <Stack direction="horizontal" backgroundColor="lightblue">
        <Stack width={100} height={100} backgroundColor="darkblue" />
      </Stack>
      <Stack direction="horizontal" backgroundColor="lightgreen" />
    </Stack>
  `;

  return <Editor source={source} />;
};
