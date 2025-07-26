import { ReactNode, useCallback } from 'react';
import { useEditing } from '../EditingContext';

type Props<Value> = {
  name: string;
  defaultValue: Value;
  renderInput: (id: string, value: Value, onChange: (value: Value) => void) => ReactNode;
};

export const PropertyControlSingle = <Value,>({ name, defaultValue, renderInput }: Props<Value>) => {
  const { activeBlock, updateActiveBlock } = useEditing();

  const value = activeBlock?.props[name] ?? defaultValue;

  const handleChange = useCallback(
    (value: Value) => {
      updateActiveBlock(name, value);
    },
    [name, updateActiveBlock]
  );

  return renderInput(name, value, handleChange);
};
