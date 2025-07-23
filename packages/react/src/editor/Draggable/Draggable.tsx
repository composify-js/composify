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
  const { isDragging, selectedNode, draggingNodeId, setSelectedNodeId, setDraggingNodeId } = useEditing();

  const [, dragRef] = useDrag(() => ({
    type,
    item,
    collect: monitor => {
      if (monitor.isDragging() && item.id) {
        setDraggingNodeId(item.id);
        setSelectedNodeId(item.id);
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
      data-composify-role="draggable"
      data-composify-dragging={isDragging && draggingNodeId == item.id}
      ref={node => {
        if (node?.firstChild) {
          dragRef(node.firstChild as Element);
        }
      }}
      className={getClassName({
        idle: !isDragging,
        selected: !!selectedNode && selectedNode.id === item.id,
      })}
      onClick={handleClick}
      {...props}
    />
  );
};
