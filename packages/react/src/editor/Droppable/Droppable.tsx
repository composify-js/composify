import { Node } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { throttle } from 'es-toolkit';
import { FC, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { TargetType } from '../Constants';
import { useEditing } from '../EditingContext';
import styles from './Droppable.module.css';

type Props = {
  item: Node;
  index: number;
};

const getClassName = getClassNameFactory('Droppable', styles);

export const Droppable: FC<Props> = ({ item, index, ...props }) => {
  const { isDragging, draggingNodeId, relocateNode, insertNode } = useEditing();

  const [{ isOver }, dropRef] = useDrop<Node, unknown, { isOver: boolean }>({
    accept: [TargetType.Canvas, TargetType.Library],
    hover: throttle((target: Node) => {
      if (target.id === item.id || !target.id || !item.id) {
        return;
      }

      relocateNode(target.id, item.id, index);
    }, 300),
    drop: (target, monitor) => {
      if (monitor.getItemType() !== TargetType.Library || !item.id) {
        return;
      }

      insertNode(target, item.id, index);
    },
    collect: monitor => ({
      isOver: monitor.isOver() && monitor.getItemType() === TargetType.Library,
    }),
  });

  const droppableStyle = useMemo(
    () => ({
      backgroundColor: isOver ? '#376DFAAA' : 'transparent',
      '--dragging-node-id': draggingNodeId ? `"${draggingNodeId}"` : '""',
    }),
    [isOver, draggingNodeId]
  );

  return (
    <div
      data-composify-role="droppable"
      data-item-id={item.id}
      ref={node => {
        dropRef(node);
      }}
      className={getClassName({ active: isDragging })}
      style={droppableStyle}
      {...props}
    />
  );
};
