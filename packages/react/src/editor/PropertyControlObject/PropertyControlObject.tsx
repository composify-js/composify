/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectPropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { PropertyControl } from '../PropertyControl';
import { PropertyControlBoolean } from '../PropertyControlBoolean';
import { PropertyControlNumber } from '../PropertyControlNumber';
import { PropertyControlText } from '../PropertyControlText';
import { PropertyControlTextArea } from '../PropertyControlTextArea';
import styles from './PropertyControlObject.module.css';

type Props = {
  name: string;
  spec: ObjectPropertySpec<Record<string, any>>;
  value?: Record<string, any>;
  onChange?: (name: string, value: Record<string, any>) => void;
};

const getClassName = getClassNameFactory('PropertyControlObject', styles);

export const PropertyControlObject = ({ name, spec, value, onChange }: Props) => (
  <PropertyControl<Record<string, any>>
    name={name}
    spec={spec}
    defaultValue={spec.default ?? {}}
    value={value}
    onChange={onChange}
    renderInput={(_, value, onChange) => {
      const handleChange = (fieldName: string, fieldValue: any) => {
        onChange({
          ...value,
          [fieldName]: fieldValue,
        });
      };

      return (
        <div className={getClassName()}>
          {Object.entries(spec.fields).map(([fieldName, fieldSpec]) => {
            switch (fieldSpec.type) {
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
              default:
                return null;
            }
          })}
        </div>
      );
    }}
  />
);
