import { useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControl } from './PropertyControl';

export const BasicUsage = () => {
  const [value, setValue] = useState<string | undefined>('');

  return (
    <>
      <Theme />
      <PropertyControl
        name="example"
        spec={{
          type: 'text',
          label: 'File',
          default: '',
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
        defaultValue=""
        renderInput={(_, onChange) => (
          <input type="file" onChange={event => onChange(event.target.files?.[0]?.name || '')} />
        )}
      />
    </>
  );
};
