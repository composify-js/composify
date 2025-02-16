import { FC, PropsWithChildren, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ClassNames, TargetType } from '../Constants';
import { useEditing } from '../EditingContext';

type Props = {
  type: TargetType;
};

export const Draggable: FC<PropsWithChildren<Props>> = ({ type, ...props }) => {
  const { setIsDragging } = useEditing();

  const [{ isDragging, opacity }, dragRef] = useDrag(() => ({
    type,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));

  useEffect(() => {
    setIsDragging(isDragging);
  }, [isDragging, setIsDragging]);

  return (
    <div
      ref={node => {
        if (node?.firstChild) {
          dragRef(node?.firstChild as Element);
        }
      }}
      className={ClassNames.Draggable}
      style={{ opacity }}
      {...props}
    />
  );
};
