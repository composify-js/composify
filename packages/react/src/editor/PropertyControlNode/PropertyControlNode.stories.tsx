import { ReactNode, useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControlNode } from './PropertyControlNode';

export const BasicUsage = () => {
  const [value, setValue] = useState<ReactNode>(null);

  return (
    <>
      <Theme />
      <PropertyControlNode
        name="example"
        spec={{
          type: 'node',
          label: 'Header',
          default: null,
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};
