import { Theme } from '../Theme';
import { PropertyControlBoolean } from './PropertyControlBoolean';

export const BasicUsage = () => (
  <>
    <Theme />
    <PropertyControlBoolean
      name="example"
      spec={{
        type: 'boolean',
        label: 'Visible',
        default: false,
      }}
    />
  </>
);

export const WithArray = () => (
  <>
    <Theme />
    <PropertyControlBoolean
      name="example"
      spec={{
        type: 'boolean',
        label: 'Visible',
        default: [false],
        list: true,
      }}
    />
  </>
);
