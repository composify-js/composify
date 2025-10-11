/** biome-ignore-all lint/suspicious/noExplicitAny: for arbitrary values */
import type { RadioPropertySpec } from '../../renderer';
import { getClassNameFactory } from '../../utils';
import { PropertyControl } from '../PropertyControl/PropertyControl';
import styles from './PropertyControlRadio.module.css';

type Props = {
  name: string;
  spec: RadioPropertySpec<any>;
  value?: any;
  compact?: boolean;
  onChange?: (name: string, value?: any) => void;
};

const getClassName = getClassNameFactory('PropertyControlRadio', styles);

export const PropertyControlRadio = ({ name, spec, ...props }: Props) => (
  <PropertyControl<any>
    {...props}
    name={name}
    spec={spec}
    defaultValue={spec.default}
    renderInput={(value, onChange) =>
      'render' in spec ? (
        spec.render(value, onChange)
      ) : (
        <div className={getClassName()}>
          {spec.options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={getClassName('Option', { selected: value === option.value })}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )
    }
  />
);
