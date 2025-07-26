import { useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControlText } from './PropertyControlText';

export const BasicUsage = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <Theme />
      <PropertyControlText
        name="example"
        spec={{
          type: 'text',
          label: 'Content',
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};
