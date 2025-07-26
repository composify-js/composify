import { getClassNameFactory } from '@composify/utils';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useEditing } from '../EditingContext';
import styles from './PropertyControl.module.css';

type Props<Value, ElementValue = Value extends (infer Element)[] ? Element : never> = {
  name: string;
  defaultValue: ElementValue;
  renderInput: (id: string, value: ElementValue, onChange: (value: ElementValue) => void) => ReactNode;
};

const getClassName = getClassNameFactory('PropertyControl', styles);

export const PropertyControlMultiple = <Value, ElementValue = Value extends (infer Element)[] ? Element : never>({
  name,
  defaultValue,
  renderInput,
}: Props<Value, ElementValue>) => {
  const { activeBlock, updateActiveBlock } = useEditing();

  const [values, setValues] = useState<ElementValue[]>(activeBlock?.props[name] ?? [defaultValue]);

  const handleClickAdd = useCallback(() => {
    setValues(prev => [...prev, defaultValue]);
  }, [defaultValue]);

  const handleClickRemove = useCallback(
    (index: number) => () => {
      setValues(prev => prev.filter((_, i) => i !== index));
    },
    []
  );

  const handleChange = useCallback(
    (index: number) => (value: ElementValue) => {
      setValues(prev => [...prev.slice(0, index), value, ...prev.slice(index + 1)]);
    },
    []
  );

  useEffect(() => {
    updateActiveBlock(name, values);
  }, [name, values, updateActiveBlock]);

  return (
    <div className={getClassName('InputList')}>
      {values.map((value, index) => (
        <div key={`${name}-${index}`} className={getClassName('InputItem')}>
          {renderInput(`${name}-${index}`, value, handleChange(index))}
          <button className={getClassName('RemoveButton')} onClick={handleClickRemove(index)}>
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 640 640">
              <path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z" />
            </svg>
          </button>
        </div>
      ))}
      <button onClick={handleClickAdd} className={getClassName('AddButton')}>
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 640 640">
          <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
        </svg>
      </button>
    </div>
  );
};
