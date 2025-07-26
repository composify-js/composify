import { TextPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlText.module.css';

type Props = {
  name: string;
  spec: TextPropertySpec<string>;
  value?: string;
  onChange?: (name: string, value: string) => void;
};

const getClassName = getClassNameFactory('PropertyControlText', styles);

export const PropertyControlText = ({ name, spec, value, onChange }: Props) => (
  <PropertyControl<string>
    name={name}
    spec={spec}
    defaultValue={spec.default ?? ''}
    value={value}
    onChange={onChange}
    renderInput={(id, value, onChange) => (
      <input
        type="text"
        id={id}
        value={value}
        onChange={event => onChange(event.target.value)}
        className={getClassName()}
      />
    )}
  />
);
