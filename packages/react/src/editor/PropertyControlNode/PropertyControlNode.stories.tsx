import { Node } from '@composify/core';
import { useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControlNode } from './PropertyControlNode';

export const BasicUsage = () => {
  const [value, setValue] = useState<Node | null>();

  return (
    <>
      <Theme />
      <PropertyControlNode
        name="example"
        spec={{
          type: 'node',
          label: 'Header',
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};
