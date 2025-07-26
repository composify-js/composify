import { BooleanPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlBoolean.module.css';

type Props = {
  name: string;
  spec: BooleanPropertySpec<boolean | boolean[]>;
  value?: boolean | boolean[];
  onChange?: (name: string, value: boolean | boolean[]) => void;
};

const getClassName = getClassNameFactory('PropertyControlBoolean', styles);

export const PropertyControlBoolean = ({ name, spec, value, onChange }: Props) => (
  <PropertyControl<boolean | boolean[]>
    name={name}
    spec={spec}
    defaultValue={[spec.default].flat()[0] ?? false}
    value={value}
    onChange={onChange}
    renderInput={(_, value, onChange) => (
      <div className={getClassName('ButtonGroup')}>
        <button
          type="button"
          className={getClassName('Button', { active: value === true })}
          onClick={() => onChange(true)}
        >
          Yes
        </button>
        <button
          type="button"
          className={getClassName('Button', { active: value === false })}
          onClick={() => onChange(false)}
        >
          No
        </button>
      </div>
    )}
  />
);
