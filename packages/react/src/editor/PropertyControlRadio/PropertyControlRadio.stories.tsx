import { useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControlRadio } from './PropertyControlRadio';

export const BasicUsage = () => {
  const [value, setValue] = useState<string | undefined>('left');

  return (
    <>
      <Theme />
      <PropertyControlRadio
        name="example"
        spec={{
          type: 'radio',
          label: 'Alignment',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};
