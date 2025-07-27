import { useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControlSelect } from './PropertyControlSelect';

export const BasicUsage = () => {
  const [value, setValue] = useState<string | undefined>('apple');

  return (
    <>
      <Theme />
      <PropertyControlSelect
        name="example"
        spec={{
          type: 'select',
          label: 'Fruit',
          options: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ],
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};
