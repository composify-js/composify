import { PopulatedNodeInfo } from '@composify/core';
import { FC, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { ClassNames, TargetType } from '../Constants';
import { useEditing } from '../EditingContext';

type Props = {
  item: PopulatedNodeInfo;
  nested: boolean;
};

export const Droppable: FC<Props> = ({ item, nested, ...props }) => {
  const { isAltDown, reorderNode, relocateNode } = useEditing();

  const [{ isRelocating }, dropRef] = useDrop<Props['item'], unknown, { isRelocating: boolean }>({
    accept: [TargetType.Canvas, TargetType.Library],
    hover: target => {
      if (target.id === item.id || target.parent?.id !== item.parent?.id || isAltDown) {
        return;
      }

      reorderNode(target.id, item.id);
    },
    drop: target => relocateNode(target.id, item.id),
    canDrop: target => target.id !== item.id && target.parent?.id !== item.id && nested && isAltDown,
    collect: monitor => ({
      isRelocating: monitor.isOver() && monitor.canDrop(),
    }),
  });

  const relocateStyle = useMemo(
    () => ({
      backgroundColor: isRelocating ? '#376DFAAA' : 'transparent',
    }),
    [isRelocating]
  );

  return (
    <div
      ref={node => {
        dropRef(node);
      }}
      className={ClassNames.Droppable}
      style={relocateStyle}
      {...props}
    />
  );
};
