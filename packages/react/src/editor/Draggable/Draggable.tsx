import { type FC, type MouseEvent, type PropsWithChildren, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import type { Node } from '../../renderer';
import type { TargetType } from '../Constants';
import { useEditing } from '../EditingContext';
import styles from './Draggable.module.css';

type Props = {
  type: TargetType;
  item: Node;
};

export const Draggable: FC<PropsWithChildren<Props>> = ({ type, item, ...props }) => {
  const { isDragging, focusedBlock, activeBlock, focusBlock, selectBlock } = useEditing();

  const [, dragRef] = useDrag(() => ({
    type,
    item,
    collect: (monitor) => {
      if (monitor.isDragging() && item.id) {
        focusBlock(item.id);
        selectBlock(item.id);
      }
    },
  }));

  const handleClick = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();

      if (item.id) {
        selectBlock(item.id);
      }
    },
    [item.id, selectBlock],
  );

  return (
    <span
      role="button"
      data-composify-role="draggable"
      data-composify-type={type}
      data-active={isDragging}
      data-selected={activeBlock?.id === item.id}
      data-dragging={focusedBlock?.id === item.id}
      className={styles.draggable}
      onClick={handleClick}
      ref={(node) => {
        if (node?.firstChild) {
          dragRef(node.firstChild as Element);
        }
      }}
      {...props}
    />
  );
};
