import { NumberPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlNumber.module.css';

type Props = {
  name: string;
  spec: NumberPropertySpec<number>;
  value?: number;
  onChange?: (name: string, value: number) => void;
};

const getClassName = getClassNameFactory('PropertyControlNumber', styles);

export const PropertyControlNumber = ({ name, spec, value, onChange }: Props) => (
  <PropertyControl<number>
    name={name}
    spec={spec}
    value={value}
    defaultValue={spec.default ?? 0}
    onChange={onChange}
    renderInput={(id, value, onChange) => (
      <input
        type="number"
        id={id}
        value={value}
        onChange={event => onChange(Number(event.target.value))}
        className={getClassName()}
      />
    )}
  />
);
