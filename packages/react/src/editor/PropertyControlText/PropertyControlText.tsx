import { TextPropertySpec } from '@composify/core';
import { useEditing } from '../EditingContext';

type Props = {
  spec: TextPropertySpec;
};

export const PropertyControlText = ({ spec }: Props) => {
  const { selectedNodeId } = useEditing();

  return (
    <div>
      <label>{spec.label}</label>
      <input type="text" value={spec.value} onChange={e => spec.onChange(e.target.value)} />
    </div>
  );
};
