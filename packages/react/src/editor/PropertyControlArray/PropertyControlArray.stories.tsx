import { useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControlArray } from './PropertyControlArray';

export const BasicUsage = () => {
  const [value, setValue] = useState<string[] | undefined>([]);

  return (
    <>
      <Theme />
      <PropertyControlArray
        name="example"
        spec={{
          type: 'array',
          label: 'List',
          item: {
            type: 'text',
            label: 'Item',
          },
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};

export const WithDefaultValue = () => {
  const [value, setValue] = useState<string[]>();

  return (
    <>
      <Theme />
      <PropertyControlArray
        name="example"
        spec={{
          type: 'array',
          label: 'List',
          item: {
            type: 'text',
            label: 'Item',
          },
          default: ['Item 1', 'Item 2'],
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};

export const WithObjectItems = () => {
  const [value, setValue] = useState<{ name: string; age: number }[]>();

  return (
    <>
      <Theme />
      <PropertyControlArray
        name="example"
        spec={{
          type: 'array',
          label: 'People',
          item: {
            label: 'Person',
            type: 'object',
            fields: {
              name: {
                type: 'text',
                label: 'Name',
              },
              age: {
                type: 'number',
                label: 'Age',
              },
            },
          },
          default: [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
          ],
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};
