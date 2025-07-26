import { PropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { ReactNode } from 'react';
import styles from './PropertyControl.module.css';
import { PropertyControlMultiple } from './PropertyControlMultiple';
import { PropertyControlSingle } from './PropertyControlSingle';

type Props<Value, ElementValue = Value extends (infer Element)[] ? Element : Value> = {
  name: string;
  spec: PropertySpec<Value>;
  defaultValue: ElementValue;
  renderInput: (id: string, value: ElementValue, onChange: (value: ElementValue) => void) => ReactNode;
};

const getClassName = getClassNameFactory('PropertyControl', styles);

export const PropertyControl = <Value,>({ spec, ...props }: Props<Value>) => (
  <div className={getClassName()}>
    <span className={getClassName('Label')}>{spec.label}</span>
    {'list' in spec && spec.list ? <PropertyControlMultiple {...props} /> : <PropertyControlSingle {...props} />}
  </div>
);
