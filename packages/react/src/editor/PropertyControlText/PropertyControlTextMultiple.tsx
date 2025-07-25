import { TextPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useEditing } from '../EditingContext';
import styles from './PropertyControlText.module.css';

type Props = {
  name: string;
  spec: TextPropertySpec<string[]>;
};

const getClassName = getClassNameFactory('PropertyControlText', styles);

export const PropertyControlTextMultiple = ({ name, spec }: Props) => {
  const { activeBlock, updateActiveBlock } = useEditing();

  const [values, setValues] = useState<string[]>(activeBlock?.props[name] ?? []);

  const handleClickAdd = useCallback(() => {
    setValues(prev => [...prev, '']);
  }, []);

  const handleChange = useCallback(
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues(prev => [...prev.slice(0, index), event.target.value, ...prev.slice(index + 1)]);
    },
    []
  );

  useEffect(() => {
    updateActiveBlock(name, values);
  }, [name, values, updateActiveBlock]);

  return (
    <div className={getClassName()}>
      <label>{spec.label}</label>
      {values.map((value, index) => (
        <input key={index} type="text" value={value} onChange={handleChange(index)} />
      ))}
      <button onClick={handleClickAdd}>Add</button>
    </div>
  );
};
