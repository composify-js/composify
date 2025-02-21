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
      <Stack direction="horizontal" backgroundColor="#ECEFF1">
        <Stack width={100} height={100} backgroundColor="#E1F5FE" />
        <Stack width={100} height={100} backgroundColor="#B3E5FC" />
      </Stack>
      <Stack direction="horizontal" backgroundColor="#CFD8DC">
        <Stack width={100} height={100} backgroundColor="#81D4FA" />
      </Stack>
      <Stack direction="horizontal" backgroundColor="#B0BEC5" />
    </Stack>
  `;

  return <Editor source={source} />;
};
