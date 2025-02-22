import { PopulatedNodeInfo } from '@composify/core';
import { throttle } from 'es-toolkit';
import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { ClassNames, TargetType } from '../Constants';
import { useEditing } from '../EditingContext';

type Props = {
  item: PopulatedNodeInfo;
  nested: boolean;
};

export const Droppable: FC<Props> = ({ item, nested, ...props }) => {
  const { isAltDown, findNode, reorderNode, relocateNode } = useEditing();

  const [, dropRef] = useDrop<Props['item']>({
    accept: [TargetType.Canvas, TargetType.Library],
    hover: throttle((target: PopulatedNodeInfo) => {
      if (target.id === item.id) {
        return;
      }

      const latestTarget = findNode(target.id);

      if (latestTarget?.parent?.id === item.parent?.id && !isAltDown) {
        reorderNode(target.id, item.id);
        return;
      }

      if (latestTarget?.parent?.id !== item.id && nested) {
        relocateNode(target.id, item.id);
      }
    }, 300),
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
