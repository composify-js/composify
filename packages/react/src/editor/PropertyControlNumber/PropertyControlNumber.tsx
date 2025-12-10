import type { NumberPropertySpec } from '@composify/react/renderer';
import { Input } from '@composify/react/ui';
import { PropertyControl } from '../PropertyControl';

type Props = {
  name: string;
  spec: NumberPropertySpec<number>;
  value?: number;
  compact?: boolean;
  onChange?: (name: string, value?: number) => void;
};

export const PropertyControlNumber = ({ spec, ...props }: Props) => (
  <PropertyControl<number>
    {...props}
    spec={spec}
    defaultValue={spec.default ?? 0}
    renderInput={(value, onChange) => (
      <Input type="number" size={undefined} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    )}
  />
);
