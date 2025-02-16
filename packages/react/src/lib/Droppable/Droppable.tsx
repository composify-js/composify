import { FC, PropsWithChildren, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { ClassNames, TargetType } from '../Constants';
import { useEditing } from '../EditingContext';

type Props = {
  direction: 'horizontal' | 'vertical';
};

export const Droppable: FC<PropsWithChildren<Props>> = ({ direction, ...props }) => {
  const { isDragging } = useEditing();

  const [{ isOver }, dropRef] = useDrop({
    accept: [TargetType.Canvas, TargetType.Library],
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  const droppableStyle = useMemo(
    () => ({
      backgroundColor: isOver ? '#376DFAAA' : 'transparent',
      ...(isDragging && direction === 'horizontal'
        ? {
            height: '24px',
            top: '-12px',
            left: 0,
            right: 0,
          }
        : {}),
      ...(isDragging && direction === 'vertical'
        ? {
            width: '24px',
            left: '-12px',
            top: 0,
            bottom: 0,
          }
        : {}),
    }),
    [isOver, isDragging]
  );

  return (
    <div className={ClassNames.DroppableContainer}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className={ClassNames.Droppable} ref={dropRef as any} style={droppableStyle} {...props} />
    </div>
  );
};
