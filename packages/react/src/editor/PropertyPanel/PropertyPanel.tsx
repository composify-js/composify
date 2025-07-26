import { Catalog } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { BlockActions } from '../BlockActions';
import { useEditing } from '../EditingContext';
import { PropertyControlBoolean } from '../PropertyControlBoolean';
import { PropertyControlNumber } from '../PropertyControlNumber';
import { PropertyControlText } from '../PropertyControlText';
import { PropertyControlTextArea } from '../PropertyControlTextArea';
import styles from './PropertyPanel.module.css';

const getClassName = getClassNameFactory('PropertyPanel', styles);

export const PropertyPanel = () => {
  const { activeBlock } = useEditing();

  if (!activeBlock) {
    return <section className={getClassName()} />;
  }

  const block = Catalog.get(activeBlock.type);

  return (
    <section className={getClassName()}>
      <div className={getClassName('Header')}>
        <h2 className={getClassName('HeaderTitle')}>{activeBlock?.type}</h2>
        <BlockActions />
      </div>
      {Object.entries(block.props).map(([name, spec]) => {
        switch (spec.type) {
          case 'boolean':
            return <PropertyControlBoolean key={name} name={name} spec={spec} />;
          case 'text':
            return <PropertyControlText key={name} name={name} spec={spec} />;
          case 'textarea':
            return <PropertyControlTextArea key={name} name={name} spec={spec} />;
          case 'number':
            return <PropertyControlNumber key={name} name={name} spec={spec} />;
          default:
            return null;
        }
      })}
    </section>
  );
};
