import type { FC } from 'react';
import { Text } from '../../preset';
import styles from './EditorHeader.module.css';

type Props = {
  title: string;
};

export const EditorHeader: FC<Props> = ({ title }) => (
  <header className={styles.container}>
    <Text level={1} size="md" weight="bold" color="on-surface">
      {title}
    </Text>
  </header>
);
