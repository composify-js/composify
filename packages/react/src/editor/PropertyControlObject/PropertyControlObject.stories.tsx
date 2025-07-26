import { useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControlObject } from './PropertyControlObject';

export const BasicUsage = () => {
  const [value, setValue] = useState({
    visible: false,
    count: 0,
    summary: '',
    description: '',
    list: ['Item 1', 'Item 2'],
  });

  return (
    <>
      <Theme />
      <PropertyControlObject
        name="example"
        spec={{
          type: 'object',
          label: 'Example Object',
          fields: {
            visible: {
              label: 'Visible',
              type: 'boolean',
            },
            count: {
              label: 'Count',
              type: 'number',
            },
            summary: {
              label: 'Summary',
              type: 'text',
            },
            description: {
              label: 'Description',
              type: 'textarea',
            },
            list: {
              label: 'List',
              type: 'array',
              item: {
                type: 'text',
                label: 'Item',
              },
              default: ['Item 1', 'Item 2'],
            },
          },
        }}
        value={value}
        onChange={(_, next) => setValue(next as typeof value)}
      />
    </>
  );
};
