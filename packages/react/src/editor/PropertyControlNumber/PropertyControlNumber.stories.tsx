import { useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControlNumber } from './PropertyControlNumber';

export const BasicUsage = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <Theme />
      <PropertyControlNumber
        name="example"
        spec={{
          type: 'number',
          label: 'Count',
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};
