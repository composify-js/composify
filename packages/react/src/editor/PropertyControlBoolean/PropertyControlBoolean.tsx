import type { BooleanPropertySpec } from '@composify/react/renderer';
import { Segment } from '@composify/react/ui';
import { PropertyControl } from '../PropertyControl';

type Props = {
  name: string;
  spec: BooleanPropertySpec<boolean>;
  value?: boolean;
  compact?: boolean;
  onChange?: (name: string, value?: boolean) => void;
};

export const PropertyControlBoolean = ({ spec, ...props }: Props) => (
  <PropertyControl<boolean>
    {...props}
    spec={spec}
    defaultValue={spec.default ?? false}
    renderInput={(value, onChange) => (
      <Segment
        size="sm"
        options={[
          { label: 'Yes', value: true },
          { label: 'No', value: false },
        ]}
        value={value}
        onChange={onChange}
      />
    )}
  />
);
