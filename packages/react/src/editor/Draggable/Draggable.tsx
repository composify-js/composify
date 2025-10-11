import { type FC, type MouseEvent, type PropsWithChildren, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import type { Node } from '../../renderer';
import { getClassNameFactory } from '../../utils';
import type { TargetType } from '../Constants';
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
      data-composify-dragging={focusedBlock?.id === item.id}
      data-composify-type={type}
      ref={(node) => {
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
