import { CopyIcon, TrashIcon } from 'lucide-react';
import { IconButton, Text } from '../../preset';
import { useEditing } from '../EditingContext';
import styles from './ActiveBlockControl.module.css';

export const ActiveBlockControl = () => {
  const { activeBlock, duplicateActiveBlock, removeActiveBlock } = useEditing();

  if (!activeBlock) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Text size="md" weight="semibold" color="on-surface">
        {activeBlock.type}
      </Text>
      <div>
        <IconButton size="sm" onClick={duplicateActiveBlock}>
          <CopyIcon />
        </IconButton>
        <IconButton size="sm" onClick={removeActiveBlock}>
          <TrashIcon />
        </IconButton>
      </div>
    </div>
  );
};
