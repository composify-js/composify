import { Theme } from '../Theme';
import { PropertyControlNumber } from './PropertyControlNumber';

export const BasicUsage = () => (
  <>
    <Theme />
    <PropertyControlNumber
      name="example"
      spec={{
        type: 'number',
        label: 'Count',
      }}
    />
  </>
);
