import { Theme } from '../Theme';
import { PropertyControlTextArea } from './PropertyControlTextArea';

export const BasicUsage = () => (
  <>
    <Theme />
    <PropertyControlTextArea
      name="example"
      spec={{
        type: 'textarea',
        label: 'Visible',
      }}
    />
  </>
);

export const WithArray = () => (
  <>
    <Theme />
    <PropertyControlTextArea
      name="example"
      spec={{
        type: 'textarea',
        label: 'Visible',
        list: true,
      }}
    />
  </>
);
