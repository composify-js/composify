import { TextPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlText.module.css';

type Props = {
  name: string;
  spec: TextPropertySpec<string | string[]>;
  value?: string | string[];
  onChange?: (name: string, value: string | string[]) => void;
};

const getClassName = getClassNameFactory('PropertyControlText', styles);

export const PropertyControlText = ({ name, spec, value, onChange }: Props) => (
  <PropertyControl<string | string[]>
    name={name}
    spec={spec}
    defaultValue={[spec.default].flat()[0] ?? ''}
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
