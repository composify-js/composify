import { ReactNode, useCallback } from 'react';
import { useEditing } from '../EditingContext';

type Props<Value> = {
  name: string;
  defaultValue: Value;
  value?: Value;
  onChange?: (name: string, value: Value) => void;
  renderInput: (id: string, value: Value, onChange: (value: Value) => void) => ReactNode;
};

export const PropertyControlSingle = <Value,>({ name, defaultValue, value, onChange, renderInput }: Props<Value>) => {
  const { activeBlock, updateActiveBlock } = useEditing();

  const effectiveValue = value ?? activeBlock?.props[name] ?? defaultValue;

  const handleChange = useCallback(
    (value: Value) => {
      (onChange ?? updateActiveBlock)(name, value);
    },
    [name, onChange, updateActiveBlock]
  );

  return renderInput(name, effectiveValue, handleChange);
};
