import { getClassNameFactory } from '@composify/utils';
import { useCallback } from 'react';
import { useEditing } from '../EditingContext';
import styles from './BlockActions.module.css';

const getClassName = getClassNameFactory('BlockActions', styles);

export const BlockActions = () => {
  const { selectedNode, duplicateNode, removeNode, setSelectedNodeId } = useEditing();

  const handleClickDuplicate = useCallback(() => {
    if (selectedNode?.id) {
      const id = duplicateNode(selectedNode.id);

      setSelectedNodeId(id);
    }
  }, [selectedNode, duplicateNode, setSelectedNodeId]);

  const handleClickRemove = useCallback(() => {
    if (selectedNode?.id) {
      removeNode(selectedNode.id);
    }
  }, [selectedNode, removeNode]);

  return (
    <div className={getClassName()}>
      <button className={getClassName('ActionItem')} onClick={handleClickDuplicate}>
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 640 640">
          <path d="M288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448L480 448C515.3 448 544 419.3 544 384L544 183.4C544 166 536.9 149.3 524.3 137.2L466.6 81.8C454.7 70.4 438.8 64 422.3 64L288 64zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L352 496L352 512L160 512L160 256L176 256L176 192L160 192z" />
        </svg>
      </button>
      <button className={getClassName('ActionItem')} onClick={handleClickRemove}>
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 640 640">
          <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
        </svg>
      </button>
    </div>
  );
};
