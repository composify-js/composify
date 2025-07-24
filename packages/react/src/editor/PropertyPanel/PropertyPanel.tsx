import { Catalog } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { BlockActions } from '../BlockActions';
import { useEditing } from '../EditingContext';
import { PropertyControlText } from '../PropertyControlText';
import styles from './PropertyPanel.module.css';

const getClassName = getClassNameFactory('PropertyPanel', styles);

export const PropertyPanel = () => {
  const { selectedNode } = useEditing();

  if (!selectedNode) {
    return null;
  }

  const block = Catalog.get(selectedNode.type);

  return (
    <section className={getClassName()}>
      <div className={getClassName('Header')}>
        <h2 className={getClassName('HeaderTitle')}>{selectedNode?.type}</h2>
        <BlockActions />
      </div>
      {Object.entries(block.props).map(([name, spec]) => {
        switch (spec.type) {
          case 'text':
            return <PropertyControlText name={name} spec={spec} />;
          default:
            return null;
        }
      })}
    </section>
  );
};
