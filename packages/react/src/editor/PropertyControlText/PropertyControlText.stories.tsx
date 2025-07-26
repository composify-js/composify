import { Theme } from '../Theme';
import { PropertyControlText } from './PropertyControlText';

export const BasicUsage = () => (
  <>
    <Theme />
    <PropertyControlText
      name="example"
      spec={{
        type: 'text',
        label: 'Content',
      }}
    />
  </>
);
