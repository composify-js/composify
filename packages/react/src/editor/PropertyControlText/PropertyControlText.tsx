import { TextPropertySpec } from '@composify/core';
import { ChangeEvent, useCallback } from 'react';
import { useEditing } from '../EditingContext';

type Props = {
  name: string;
  spec: TextPropertySpec;
};

export const PropertyControlText = ({ name, spec }: Props) => {
  const { activeBlock, updateActiveBlock } = useEditing();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateActiveBlock(name, event.target.value);
    },
    [name, updateActiveBlock]
  );

  return (
    <div>
      <label>{spec.label}</label>
      <input type="text" value={activeBlock?.props[name]} onChange={handleChange} />
    </div>
  );
};
