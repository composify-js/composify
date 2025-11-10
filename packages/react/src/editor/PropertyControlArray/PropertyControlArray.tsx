/** biome-ignore-all lint/suspicious/noExplicitAny: for arbitrary values */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: array item should use index as a key */

import type { ArrayPropertySpec } from '@composify/react/renderer';
import { Button, IconButton } from '@composify/react/ui';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { PropertyControl } from '../PropertyControl';
import { PropertyControlBoolean } from '../PropertyControlBoolean';
import { PropertyControlCustom } from '../PropertyControlCustom';
import { PropertyControlNumber } from '../PropertyControlNumber';
import { PropertyControlObject } from '../PropertyControlObject';
import { PropertyControlRadio } from '../PropertyControlRadio';
import { PropertyControlSelect } from '../PropertyControlSelect';
import { PropertyControlText } from '../PropertyControlText';
import { PropertyControlTextArea } from '../PropertyControlTextArea';
import styles from './PropertyControlArray.module.css';

type Props = {
  name: string;
  spec: ArrayPropertySpec<any[]>;
  value?: any[];
  compact?: boolean;
  onChange?: (name: string, value?: any[]) => void;
};

export const PropertyControlArray = ({ name, spec, ...props }: Props) => (
  <PropertyControl<any[]>
    {...props}
    orientation="vertical"
    name={name}
    spec={spec}
    defaultValue={spec.default ?? []}
    renderInput={(values, onChange) => {
      const isObjectItem = spec.item.type === 'object';

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
        <div className={styles.container}>
          {values.map((value, index) => (
            <div key={`${name}-${index}`} className={isObjectItem ? styles.object : styles.normal}>
              <div className={styles.content}>
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
                    case 'custom':
                      return (
                        <PropertyControlCustom
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
                    case 'radio':
                      return (
                        <PropertyControlRadio
                          name={name}
                          spec={spec.item}
                          value={value}
                          onChange={handleChange(index)}
                          compact={true}
                        />
                      );
                    case 'select':
                      return (
                        <PropertyControlSelect
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
                    default:
                      return null;
                  }
                })()}
              </div>
              {isObjectItem ? (
                <Button variant="outline" size="sm" onClick={handleClickRemove(index)}>
                  <MinusIcon />
                </Button>
              ) : (
                <IconButton size="xs" onClick={handleClickRemove(index)}>
                  <MinusIcon />
                </IconButton>
              )}
            </div>
          ))}
          <Button variant="secondary" size="sm" onClick={handleClickAdd}>
            <PlusIcon />
          </Button>
        </div>
      );
    }}
  />
);
