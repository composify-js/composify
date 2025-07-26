import { PropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { ReactNode, useCallback } from 'react';
import { useEditing } from '../EditingContext';
import styles from './PropertyControl.module.css';

type Props<Value> = {
  name: string;
  spec: PropertySpec<Value>;
  defaultValue: Value;
  value?: Value;
  compact?: boolean;
  onChange?: (name: string, value: Value) => void;
  renderInput: (value: Value, onChange: (value: Value) => void) => ReactNode;
};

const getClassName = getClassNameFactory('PropertyControl', styles);

export const PropertyControl = <Value,>({
  name,
  spec,
  defaultValue,
  value,
  compact,
  onChange,
  renderInput,
}: Props<Value>) => {
  const { activeBlock, updateActiveBlock } = useEditing();

  const effectiveValue = (onChange ? value : activeBlock?.props[name]) ?? defaultValue;

  const handleChange = useCallback(
    (value: Value) => {
      (onChange ?? updateActiveBlock)(name, value);
    },
    [name, onChange, updateActiveBlock]
  );

  return (
    <div className={getClassName()}>
      {compact ? null : <span className={getClassName('Label')}>{spec.label}</span>}
      {renderInput(effectiveValue, handleChange)}
    </div>
  );
};
