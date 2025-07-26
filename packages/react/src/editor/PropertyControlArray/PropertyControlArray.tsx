/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrayPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { PropertyControl } from '../PropertyControl';
import { PropertyControlBoolean } from '../PropertyControlBoolean';
import { PropertyControlNumber } from '../PropertyControlNumber';
import { PropertyControlObject } from '../PropertyControlObject';
import { PropertyControlText } from '../PropertyControlText';
import { PropertyControlTextArea } from '../PropertyControlTextArea';
import styles from './PropertyControlArray.module.css';

type Props = {
  name: string;
  spec: ArrayPropertySpec<any[]>;
  value?: any[];
  compact?: boolean;
  onChange?: (name: string, value: any[]) => void;
};

const getClassName = getClassNameFactory('PropertyControlArray', styles);

export const PropertyControlArray = ({ name, spec, value, ...props }: Props) => {
  return (
    <PropertyControl<any[]>
      {...props}
      name={name}
      spec={spec}
      value={value}
      defaultValue={spec.default ?? []}
      renderInput={(values, onChange) => {
        const handleClickAdd = () => {
          onChange([...values, spec.item.default]);
        };

        const handleClickRemove = (index: number) => () => {
          onChange(values.filter((_, i) => i !== index));
        };

        const handleChange = (index: number) => (_: string, fieldValue: any) => {
          onChange([...values.slice(0, index), fieldValue, ...values.slice(index + 1)]);
        };

        return (
          <div className={getClassName()}>
            {values.map((value, index) => (
              <div key={`${name}-${index}`} className={getClassName('Item', { object: spec.item.type === 'object' })}>
                <div className={getClassName('ItemContent')}>
                  {(() => {
                    switch (spec.item.type) {
                      case 'array':
                        return (
                          <PropertyControlArray
                            name={name}
                            spec={spec.item}
                            value={value}
                            onChange={handleChange(index)}
                            compact={true}
                          />
                        );
                      case 'boolean':
                        return (
                          <PropertyControlBoolean
                            name={name}
                            spec={spec.item}
                            value={value}
                            onChange={handleChange(index)}
                            compact={true}
                          />
                        );

                      case 'text':
                        return (
                          <PropertyControlText
                            name={name}
                            spec={spec.item}
                            value={value}
                            onChange={handleChange(index)}
                            compact={true}
                          />
                        );
                      case 'textarea':
                        return (
                          <PropertyControlTextArea
                            name={name}
                            spec={spec.item}
                            value={value}
                            onChange={handleChange(index)}
                            compact={true}
                          />
                        );
                      case 'number':
                        return (
                          <PropertyControlNumber
                            name={name}
                            spec={spec.item}
                            value={value}
                            onChange={handleChange(index)}
                            compact={true}
                          />
                        );
                      case 'object':
                        return (
                          <PropertyControlObject
                            name={name}
                            spec={spec.item}
                            value={value}
                            onChange={handleChange(index)}
                            compact={true}
                          />
                        );
                      default:
                        return null;
                    }
                  })()}
                </div>
                <button
                  className={getClassName('RemoveButton', { object: spec.item.type === 'object' })}
                  onClick={handleClickRemove(index)}
                >
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
      }}
    />
  );
};
