import { Node } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { MouseEvent, FC, PropsWithChildren, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { TargetType } from '../Constants';
import { useEditing } from '../EditingContext';
import styles from './Draggable.module.css';

type Props = {
  type: TargetType;
  item: Node;
};

const getClassName = getClassNameFactory('Draggable', styles);

export const Draggable: FC<PropsWithChildren<Props>> = ({ type, item, ...props }) => {
  const { isDragging, focusedBlock, activeBlock, focusBlock, selectBlock } = useEditing();

  const [, dragRef] = useDrag(() => ({
    type,
    item,
    collect: monitor => {
      if (monitor.isDragging() && item.id) {
        focusBlock(item.id);
        selectBlock(item.id);
      }
    },
  }));

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (item.id) {
        selectBlock(item.id);
      }
    },
    [item.id, selectBlock]
  );

  return (
    <div
      data-composify-role="draggable"
      data-composify-dragging={focusedBlock?.id == item.id}
      ref={node => {
        if (node?.firstChild) {
          dragRef(node.firstChild as Element);
        }
      }}
      className={getClassName({
        idle: !isDragging,
        selected: !!activeBlock && activeBlock.id === item.id,
      })}
      onClick={handleClick}
      {...props}
    />
  );
};
