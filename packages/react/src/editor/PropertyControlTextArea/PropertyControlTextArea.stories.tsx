import { useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControlTextArea } from './PropertyControlTextArea';

export const BasicUsage = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <Theme />
      <PropertyControlTextArea
        name="example"
        spec={{
          type: 'textarea',
          label: 'Content',
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};
