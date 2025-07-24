import { TextPropertySpec } from '@composify/core';
import { ChangeEvent, useCallback } from 'react';
import { useEditing } from '../EditingContext';

type Props = {
  name: string;
  spec: TextPropertySpec;
};

export const PropertyControlText = ({ name, spec }: Props) => {
  const { selectedNode, updateNode } = useEditing();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateNode(name, event.target.value);
    },
    [name, updateNode]
  );

  return (
    <div>
      <label>{spec.label}</label>
      <input type="text" value={selectedNode?.props[name]} onChange={handleChange} />
    </div>
  );
};
