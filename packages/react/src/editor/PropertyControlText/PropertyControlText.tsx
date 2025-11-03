import { Input } from '../../preset';
import type { TextPropertySpec } from '../../renderer';
import { PropertyControl } from '../PropertyControl';

type Props = {
  name: string;
  spec: TextPropertySpec<string>;
  value?: string;
  compact?: boolean;
  onChange?: (name: string, value?: string) => void;
};

export const PropertyControlText = ({ spec, ...props }: Props) => (
  <PropertyControl<string>
    {...props}
    spec={spec}
    defaultValue={spec.default ?? ''}
    renderInput={(value, onChange) => (
      <Input
        type="text"
        placeholder={spec.placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    )}
  />
);
