import { getClassNameFactory } from '@composify/utils';
import { type FC } from 'react';
import { useEditing } from '../EditingContext';
import { OutlineItem } from '../OutlineItem';
import styles from './Outline.module.css';

const getClassName = getClassNameFactory('Outline', styles);

export const Outline: FC<unknown> = () => {
  const { root } = useEditing();

  return (
    <>
      <div className={getClassName()}>
        <h2 className={getClassName('Title')}>Outline</h2>
      </div>
      <ol className={getClassName('List')}>
        <OutlineItem node={root} depth={1} />
      </ol>
    </>
  );
};
