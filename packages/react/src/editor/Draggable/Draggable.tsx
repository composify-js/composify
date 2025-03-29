import { Node } from '@composify/core';
import { MouseEvent, FC, PropsWithChildren, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { ClassNames, TargetType } from '../Constants';
import { useEditing } from '../EditingContext';

type Props = {
  type: TargetType;
  item: Node;
};

export const Draggable: FC<PropsWithChildren<Props>> = ({ type, item, ...props }) => {
  const { setSelectedNodeId, setDraggingNodeId } = useEditing();

  const [, dragRef] = useDrag(() => ({
    type,
    item,
    collect: monitor => {
      if (monitor.isDragging() && item.id) {
        setDraggingNodeId(item.id);
      }
    },
  }));

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (item.id) {
        setSelectedNodeId(item.id);
      }
    },
    [item.id, setSelectedNodeId]
  );

  return (
    <div
      data-item-id={item.id}
      ref={node => {
        if (node?.firstChild) {
          dragRef(node.firstChild as Element);
        }
      }}
      className={ClassNames.Draggable}
      onClick={handleClick}
      {...props}
    />
  );
};
