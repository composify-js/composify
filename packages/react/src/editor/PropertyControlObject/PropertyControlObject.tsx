/** biome-ignore-all lint/suspicious/noExplicitAny: for arbitrary values */
import type { ObjectPropertySpec } from '../../renderer';
import { PropertyControl } from '../PropertyControl';
import { PropertyControlArray } from '../PropertyControlArray';
import { PropertyControlBoolean } from '../PropertyControlBoolean';
import { PropertyControlCustom } from '../PropertyControlCustom';
import { PropertyControlNumber } from '../PropertyControlNumber';
import { PropertyControlRadio } from '../PropertyControlRadio';
import { PropertyControlSelect } from '../PropertyControlSelect';
import { PropertyControlText } from '../PropertyControlText';
import { PropertyControlTextArea } from '../PropertyControlTextArea';
import styles from './PropertyControlObject.module.css';

type Props = {
  name: string;
  spec: ObjectPropertySpec<Record<string, any>>;
  value?: Record<string, any>;
  compact?: boolean;
  onChange?: (name: string, value?: Record<string, any>) => void;
};

export const PropertyControlObject = ({ spec, ...props }: Props) => (
  <PropertyControl<Record<string, any>>
    {...props}
    orientation="vertical"
    spec={spec}
    defaultValue={spec.default ?? {}}
    renderInput={(value, onChange) => {
      const handleChange = (fieldName: string, fieldValue: any) => {
        const next = { ...value };

        if (typeof fieldValue === 'undefined') {
          delete next[fieldName];
        } else {
          next[fieldName] = fieldValue;
        }

        onChange(next);
      };

      return (
        <div className={styles.container}>
          {Object.entries(spec.fields).map(([fieldName, fieldSpec]) => {
            switch (fieldSpec.type) {
              case 'array':
                return (
                  <PropertyControlArray
                    key={fieldName}
                    name={fieldName}
                    spec={fieldSpec}
                    value={value[fieldName]}
                    onChange={handleChange}
                  />
                );
              case 'boolean':
                return (
                  <PropertyControlBoolean
                    key={fieldName}
                    name={fieldName}
                    spec={fieldSpec}
                    value={value[fieldName]}
                    onChange={handleChange}
                  />
                );
              case 'custom':
                return (
                  <PropertyControlCustom
                    key={fieldName}
                    name={fieldName}
                    spec={fieldSpec}
                    value={value[fieldName]}
                    onChange={handleChange}
                  />
                );
              case 'number':
                return (
                  <PropertyControlNumber
                    key={fieldName}
                    name={fieldName}
                    spec={fieldSpec}
                    value={value[fieldName]}
                    onChange={handleChange}
                  />
                );
              case 'object':
                return (
                  <PropertyControlObject
                    key={fieldName}
                    name={fieldName}
                    spec={fieldSpec}
                    value={value[fieldName]}
                    onChange={handleChange}
                  />
                );
              case 'radio':
                return (
                  <PropertyControlRadio
                    key={fieldName}
                    name={fieldName}
                    spec={fieldSpec}
                    value={value[fieldName]}
                    onChange={handleChange}
                  />
                );
              case 'select':
                return (
                  <PropertyControlSelect
                    key={fieldName}
                    name={fieldName}
                    spec={fieldSpec}
                    value={value[fieldName]}
                    onChange={handleChange}
                  />
                );
              case 'text':
                return (
                  <PropertyControlText
                    key={fieldName}
                    name={fieldName}
                    spec={fieldSpec}
                    value={value[fieldName]}
                    onChange={handleChange}
                  />
                );
              case 'textarea':
                return (
                  <PropertyControlTextArea
                    key={fieldName}
                    name={fieldName}
                    spec={fieldSpec}
                    value={value[fieldName]}
                    onChange={handleChange}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      );
    }}
  />
);
