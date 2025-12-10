import type { SelectPropertySpec } from '@composify/react/renderer';
import { Select } from '@composify/react/ui';
import { PropertyControl } from '../PropertyControl';

type Props<Value> = {
  name: string;
  spec: SelectPropertySpec<Value>;
  value?: Value;
  compact?: boolean;
  onChange?: (name: string, value?: Value) => void;
};

export const PropertyControlSelect = <Value,>({ name, spec, ...props }: Props<Value>) => (
  <PropertyControl<Value>
    {...props}
    name={name}
    spec={spec}
    defaultValue={spec.default ?? spec.options[0].value}
    renderInput={(value, onChange) => (
      <Select
        options={spec.options.map((option, index) => ({ label: option.label, value: index }))}
        value={String(spec.options.findIndex((option) => option.value === value))}
        onChange={(event) => {
          const index = Number(event.target.value);

          onChange(spec.options[index].value);
        }}
      />
    )}
  />
);
