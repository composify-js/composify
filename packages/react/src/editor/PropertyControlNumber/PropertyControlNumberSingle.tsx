import { NumberPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { ChangeEvent, useCallback } from 'react';
import { useEditing } from '../EditingContext';
import styles from './PropertyControlNumber.module.css';

type Props = {
  name: string;
  spec: NumberPropertySpec<number>;
};

const getClassName = getClassNameFactory('PropertyControlNumber', styles);

export const PropertyControlNumberSingle = ({ name, spec }: Props) => {
  const { activeBlock, updateActiveBlock } = useEditing();

  const value = activeBlock?.props[name] ?? 0;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateActiveBlock(name, Number(event.target.value));
    },
    [name, updateActiveBlock]
  );

  return (
    <div className={getClassName()}>
      <label htmlFor={name} className={getClassName('Label')}>
        {spec.label}
      </label>
      <input type="number" id={name} value={value} onChange={handleChange} className={getClassName('Input')} />
    </div>
  );
};
