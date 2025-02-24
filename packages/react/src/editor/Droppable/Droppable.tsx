import { PopulatedNode } from '@composify/core';
import { throttle } from 'es-toolkit';
import { FC, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { ClassNames, TargetType } from '../Constants';
import { useEditing } from '../EditingContext';

type Props = {
  item: PopulatedNode;
  index: number;
};

export const Droppable: FC<Props> = ({ item, index, ...props }) => {
  const { relocateNode } = useEditing();

  const [{ isOver }, dropRef] = useDrop<Props['item'], unknown, { isOver: boolean }>({
    accept: [TargetType.Canvas, TargetType.Library],
    hover: throttle((target: PopulatedNode) => {
      if (target.id === item.id) {
        return;
      }

      relocateNode(target.id, item.id, index);
    }, 300),
    drop: (target, monitor) => {
      if (monitor.getItemType() !== TargetType.Library) {
        return;
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  const droppableStyle = useMemo(
    () => ({
      backgroundColor: isOver ? '#376DFAAA' : 'transparent',
    }),
    [isOver]
  );

  return (
    <div
      data-item-id={item.id}
      ref={node => {
        dropRef(node);
      }}
      className={ClassNames.Droppable}
      style={droppableStyle}
      {...props}
    />
  );
};
