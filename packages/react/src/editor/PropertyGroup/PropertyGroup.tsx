/** biome-ignore-all lint/suspicious/noExplicitAny: for arbitrary props */
import type { FC } from 'react';
import { VStack } from '../../preset';
import type { PropertySpec } from '../../renderer';
import { createVariants } from '../../utils';
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
import styles from './PropertyGroup.module.css';

const variants = createVariants(styles);

type Props = {
  group: string;
  items: Record<string, PropertySpec<any>>;
};

export const PropertyGroup: FC<Props> = ({ group, items }) => (
  <VStack className={variants('propertyGroup')}>
    <span className={variants('groupLabel')}>{group}</span>
    <div className={variants('contentGrid')}>
      {Object.entries(items).map(([name, spec]) => {
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
  </VStack>
);
