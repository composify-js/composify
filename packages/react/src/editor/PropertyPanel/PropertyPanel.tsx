import { getClassNameFactory } from '@composify/utils';
import styles from './PropertyPanel.module.css';

const getClassName = getClassNameFactory('PropertyPanel', styles);

export const PropertyPanel = () => (
  <section className={getClassName()}>
    <div className={getClassName('Header')}>
      <h2 className={getClassName('HeaderTitle')}>Text</h2>
    </div>
  </section>
);
