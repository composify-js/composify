import { FC, PropsWithChildren, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { ClassNames, TargetType } from '../Constants';

export const Droppable: FC<PropsWithChildren> = props => {
  const [{ isOver }, dropRef] = useDrop({
    accept: [TargetType.Canvas, TargetType.Library],
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
      ref={node => {
        dropRef(node);
      }}
      className={ClassNames.Droppable}
      style={droppableStyle}
      {...props}
    />
  );
};
