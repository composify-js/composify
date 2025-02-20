import { FC, PropsWithChildren, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { ClassNames, TargetType } from '../Constants';

type Props = {
  type: TargetType;
};

export const Draggable: FC<PropsWithChildren<Props>> = ({ type, ...props }) => {
  const targetRef = useRef<HTMLElement>(null);

  const [, dragRef] = useDrag(() => ({
    type,
    collect: monitor => {
      targetRef.current?.style.setProperty('visibility', monitor.isDragging() ? 'hidden' : 'visible');
    },
  }));

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
