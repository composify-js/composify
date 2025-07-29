/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomPropertySpec } from '@composify/core';
import { PropertyControl } from '../PropertyControl';

type Props<Value = any> = {
  name: string;
  spec: CustomPropertySpec<Value>;
  value?: Value;
  compact?: boolean;
  onChange?: (name: string, value?: Value) => void;
};

export const PropertyControlCustom = <Value,>({ name, spec, ...props }: Props<Value>) => (
  <PropertyControl<Value>
    {...props}
    name={name}
    spec={spec}
    defaultValue={spec.default as Value}
    renderInput={(value, onChange) => spec.render(value, onChange)}
  />
);
