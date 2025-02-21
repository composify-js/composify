import { PopulatedNodeInfo } from '@composify/core';
import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { ClassNames, TargetType } from '../Constants';
import { useEditing } from '../EditingContext';

type Props = {
  item: PopulatedNodeInfo;
};

export const Droppable: FC<Props> = ({ item, ...props }) => {
  const { isAltDown, swapNode } = useEditing();

  const [, dropRef] = useDrop<Props['item']>({
    accept: [TargetType.Canvas, TargetType.Library],
    hover: target => {
      if (target.id === item.id || target.parent?.id !== item.parent?.id || isAltDown) {
        return;
      }

      swapNode(target.id, item.id);
    },
  });

  return (
    <div
      ref={node => {
        dropRef(node);
      }}
      className={ClassNames.Droppable}
      {...props}
    />
  );
};
