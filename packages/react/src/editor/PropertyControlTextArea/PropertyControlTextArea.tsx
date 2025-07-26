import { TextAreaPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlTextArea.module.css';

type Props = {
  name: string;
  spec: TextAreaPropertySpec<string>;
  value?: string;
  onChange?: (name: string, value: string) => void;
};

const getClassName = getClassNameFactory('PropertyControlTextArea', styles);

export const PropertyControlTextArea = ({ name, spec, value, onChange }: Props) => (
  <PropertyControl<string>
    name={name}
    spec={spec}
    defaultValue={spec.default ?? ''}
    value={value}
    onChange={onChange}
    renderInput={(id, value, onChange) => (
      <textarea
        id={id}
        value={value}
        rows={3}
        onChange={event => onChange(event.target.value)}
        className={getClassName()}
      />
    )}
  />
);
