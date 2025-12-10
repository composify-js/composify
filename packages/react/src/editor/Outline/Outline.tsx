import { Text } from '@composify/react/ui';
import type { FC } from 'react';
import { useEditing } from '../EditingContext';
import { OutlineItem } from '../OutlineItem';
import styles from './Outline.module.css';

export const Outline: FC<unknown> = () => {
  const { root } = useEditing();

  return (
    <div>
      <Text size="xs" weight="semibold" color="on-surface" className={styles.title}>
        Outline
      </Text>
      <ol className={styles.list}>
        <OutlineItem node={root} depth={1} />
      </ol>
    </div>
  );
};
