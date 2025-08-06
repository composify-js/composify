import { getClassNameFactory } from '@composify/utils';
import { BooleanPropertySpec } from '../../renderer';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlBoolean.module.css';

type Props = {
  name: string;
  spec: BooleanPropertySpec<boolean>;
  value?: boolean;
  compact?: boolean;
  onChange?: (name: string, value?: boolean) => void;
};

const getClassName = getClassNameFactory('PropertyControlBoolean', styles);

export const PropertyControlBoolean = ({ spec, ...props }: Props) => (
  <PropertyControl<boolean>
    {...props}
    spec={spec}
    defaultValue={spec.default ?? false}
    renderInput={(value, onChange) => (
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
