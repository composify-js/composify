import { BooleanPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlBoolean.module.css';

type Props = {
  name: string;
  spec: BooleanPropertySpec<boolean | boolean[]>;
};

const getClassName = getClassNameFactory('PropertyControlBoolean', styles);

export const PropertyControlBoolean = ({ name, spec }: Props) => (
  <PropertyControl<boolean | boolean[]>
    name={name}
    spec={spec}
    defaultValue={false}
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
