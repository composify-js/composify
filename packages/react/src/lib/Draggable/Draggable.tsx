import { PopulatedNodeInfo } from '@composify/core';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { ClassNames, TargetType } from '../Constants';

type Props = {
  type: TargetType;
  item: PopulatedNodeInfo;
};

export const Draggable: FC<PropsWithChildren<Props>> = ({ type, item, ...props }) => {
  const targetRef = useRef<HTMLElement>(null);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type,
    item: () => item,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    targetRef.current?.style.setProperty('visibility', isDragging ? 'hidden' : 'visible');
  }, [isDragging]);

  return (
    <div
      ref={node => {
        if (node?.firstChild) {
          dragRef(node.firstChild as Element);

          targetRef.current = node.firstChild as HTMLElement;
        }
      }}
      className={ClassNames.Draggable}
      {...props}
    />
  );
};
