import { Catalog } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import { useEditing } from '../EditingContext';
import { PropertyControlArray } from '../PropertyControlArray';
import { PropertyControlBoolean } from '../PropertyControlBoolean';
import { PropertyControlCustom } from '../PropertyControlCustom';
import { PropertyControlNode } from '../PropertyControlNode';
import { PropertyControlNumber } from '../PropertyControlNumber';
import { PropertyControlObject } from '../PropertyControlObject';
import { PropertyControlRadio } from '../PropertyControlRadio';
import { PropertyControlSelect } from '../PropertyControlSelect';
import { PropertyControlText } from '../PropertyControlText';
import { PropertyControlTextArea } from '../PropertyControlTextArea';
import styles from './PropertyLibrary.module.css';

const getClassName = getClassNameFactory('PropertyLibrary', styles);

export const PropertyLibrary: FC<unknown> = () => {
  const { activeBlock } = useEditing();

  if (!activeBlock) {
    return null;
  }

  const block = Catalog.get(activeBlock.type);

  if (!block) {
    return null;
  }

  return (
    <div className={getClassName()}>
      {Object.entries(block.props).map(([name, spec]) => {
        switch (spec.type) {
          case 'array':
            return <PropertyControlArray key={name} name={name} spec={spec} />;
          case 'boolean':
            return <PropertyControlBoolean key={name} name={name} spec={spec} />;
          case 'custom':
            return <PropertyControlCustom key={name} name={name} spec={spec} />;
          case 'node':
            return <PropertyControlNode key={name} name={name} spec={spec} />;
          case 'number':
            return <PropertyControlNumber key={name} name={name} spec={spec} />;
          case 'object':
            return <PropertyControlObject key={name} name={name} spec={spec} />;
          case 'radio':
            return <PropertyControlRadio key={name} name={name} spec={spec} />;
          case 'select':
            return <PropertyControlSelect key={name} name={name} spec={spec} />;
          case 'text':
            return <PropertyControlText key={name} name={name} spec={spec} />;
          case 'textarea':
            return <PropertyControlTextArea key={name} name={name} spec={spec} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
