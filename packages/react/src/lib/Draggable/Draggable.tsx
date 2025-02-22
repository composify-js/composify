import { PopulatedNodeInfo } from '@composify/core';
import { FC, PropsWithChildren } from 'react';
import { useDrag } from 'react-dnd';
import { ClassNames, TargetType } from '../Constants';
import { useEditing } from '../EditingContext';

type Props = {
  type: TargetType;
  item: PopulatedNodeInfo;
};

export const Draggable: FC<PropsWithChildren<Props>> = ({ type, item, ...props }) => {
  const { setTargetId } = useEditing();

  const [, dragRef] = useDrag(() => ({
    type,
    item,
    collect: monitor => {
      if (monitor.isDragging()) {
        setTargetId(item.id);
      }
    },
  }));

  return (
    <div
      data-item-id={item.id}
      ref={node => {
        if (node?.firstChild) {
          dragRef(node.firstChild as Element);
        }
      }}
      className={ClassNames.Draggable}
      {...props}
    />
  );
};
