import { TextPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { ChangeEvent, useCallback } from 'react';
import { useEditing } from '../EditingContext';
import styles from './PropertyControlText.module.css';

type Props = {
  name: string;
  spec: TextPropertySpec<string>;
};

const getClassName = getClassNameFactory('PropertyControlText', styles);

export const PropertyControlTextSingle = ({ name, spec }: Props) => {
  const { activeBlock, updateActiveBlock } = useEditing();

  const value = activeBlock?.props[name] ?? '';

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateActiveBlock(name, event.target.value);
    },
    [name, updateActiveBlock]
  );

  return (
    <div className={getClassName()}>
      <label>{spec.label}</label>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
};
