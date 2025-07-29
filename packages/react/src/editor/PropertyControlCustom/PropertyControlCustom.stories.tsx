import { useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControlCustom } from './PropertyControlCustom';

export const BasicUsage = () => {
  const [value, setValue] = useState<number | undefined>(0);

  return (
    <>
      <Theme />
      <PropertyControlCustom
        name="example"
        spec={{
          type: 'custom',
          label: 'Counter',
          default: 0,
          render: (val: number, onChange: (next: number) => void) => (
            <button onClick={() => onChange((val ?? 0) + 1)}>{val}</button>
          ),
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};
