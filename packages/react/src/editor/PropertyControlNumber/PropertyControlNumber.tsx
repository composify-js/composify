import { NumberPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlNumber.module.css';

type Props = {
  name: string;
  spec: NumberPropertySpec<number>;
  value?: number;
  compact?: boolean;
  onChange?: (name: string, value: number) => void;
};

const getClassName = getClassNameFactory('PropertyControlNumber', styles);

export const PropertyControlNumber = ({ spec, ...props }: Props) => (
  <PropertyControl<number>
    {...props}
    spec={spec}
    defaultValue={spec.default ?? 0}
    renderInput={(value, onChange) => (
      <input
        type="number"
        value={value}
        onChange={event => onChange(Number(event.target.value))}
        className={getClassName()}
      />
    )}
  />
);
