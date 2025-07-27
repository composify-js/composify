import { useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControlBoolean } from './PropertyControlBoolean';

export const BasicUsage = () => {
  const [value, setValue] = useState<boolean | undefined>(false);

  return (
    <>
      <Theme />
      <PropertyControlBoolean
        name="example"
        spec={{
          type: 'boolean',
          label: 'Visible',
          default: false,
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};
