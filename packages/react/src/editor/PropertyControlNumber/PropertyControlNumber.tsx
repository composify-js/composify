import { NumberPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlNumber.module.css';

type Props = {
  name: string;
  spec: NumberPropertySpec<number | number[]>;
};

const getClassName = getClassNameFactory('PropertyControlNumber', styles);

export const PropertyControlNumber = ({ name, spec }: Props) => (
  <PropertyControl<number | number[]>
    name={name}
    spec={spec}
    defaultValue={0}
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
