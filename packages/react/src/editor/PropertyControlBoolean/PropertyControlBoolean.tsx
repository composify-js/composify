import { Segment } from '../../preset';
import type { BooleanPropertySpec } from '../../renderer';
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
