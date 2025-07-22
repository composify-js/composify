import { getClassNameFactory } from '@composify/utils';
import { useEditing } from '../EditingContext';
import styles from './PropertyPanel.module.css';

const getClassName = getClassNameFactory('PropertyPanel', styles);

export const PropertyPanel = () => {
  const { selectedNode } = useEditing();

  return (
    <section className={getClassName()}>
      <div className={getClassName('Header')}>
        <h2 className={getClassName('HeaderTitle')}>{selectedNode?.type}</h2>
      </div>
    </section>
  );
};
