import { type SelectPropertySpec } from '../../renderer';
import { getClassNameFactory } from '../../utils';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlSelect.module.css';

type Props<Value> = {
  name: string;
  spec: SelectPropertySpec<Value>;
  value?: Value;
  compact?: boolean;
  onChange?: (name: string, value?: Value) => void;
};

const getClassName = getClassNameFactory('PropertyControlSelect', styles);

export const PropertyControlSelect = <Value,>({ name, spec, ...props }: Props<Value>) => (
  <PropertyControl<Value>
    {...props}
    name={name}
    spec={spec}
    defaultValue={spec.default ?? spec.options[0].value}
    renderInput={(value, onChange) => (
      <select
        className={getClassName()}
        value={String(spec.options.findIndex(option => option.value === value))}
        onChange={event => {
          const index = Number(event.target.value);

          onChange(spec.options[index].value);
        }}
      >
        {spec.options.map((option, index) => (
          <option key={option.label} value={index}>
            {option.label}
          </option>
        ))}
      </select>
    )}
  />
);
