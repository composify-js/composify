/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { Fragment } from 'react/jsx-runtime';
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
    renderInput={(value, onChange) => (
      <div className={getClassName()}>
        {spec.options.map((option, index) => {
          const handleClick = () => onChange(option.value);

          return (
            <Fragment key={`${name}-${index}`}>
              {'render' in option ? (
                option.render(option.value, handleClick)
              ) : (
                <button className={getClassName('Option', { selected: value === option.value })} onClick={handleClick}>
                  {option.label}
                </button>
              )}
            </Fragment>
          );
        })}
      </div>
    )}
  />
);
