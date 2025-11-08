import type { FC } from 'react';
import { Text } from '../../preset';
import type { Block } from '../../renderer';
import { BlockItem } from '../BlockItem';
import styles from './BlockGroup.module.css';

type Props = {
  category: string;
  blocks: Block[];
};

export const BlockGroup: FC<Props> = ({ category, blocks }) => (
  <div className={styles.container}>
    <Text size="xs" weight="medium" color="on-surface" className={styles.category}>
      {category}
    </Text>
    <div className={styles.grid}>
      {blocks.map((block) => (
        <BlockItem key={block.name} block={block} />
      ))}
    </div>
  </div>
);
