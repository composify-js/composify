import { throttle } from 'es-toolkit';
import { type FC, type PropsWithChildren } from 'react';
import { useDrop } from 'react-dnd';
import { type Node } from '../../renderer';
import { getClassNameFactory } from '../../utils';
import { TargetType } from '../Constants';
import { useEditing } from '../EditingContext';
import styles from './Droppable.module.css';

type Props = PropsWithChildren<{
  item: Node;
  index: number;
  onDrop?: (item: Node) => void;
}>;

const getClassName = getClassNameFactory('Droppable', styles);

export const Droppable: FC<Props> = ({ item, index, onDrop, ...props }) => {
  const { isDragging, focusedBlock, relocateFocusedBlock, insertBlock } = useEditing();

  const [{ isOver }, dropRef] = useDrop<Node, unknown, { isOver: boolean }>({
    accept: [TargetType.Canvas, TargetType.Library],
    hover: throttle((target: Node) => {
      if (target.id === item.id || !target.id || !item.id) {
        return;
      }

      relocateFocusedBlock({ id: item.id, index });
    }, 300),
    drop: (target, monitor) => {
      if (monitor.getItemType() !== TargetType.Library || !item.id) {
        return;
      }

      if (onDrop) {
        onDrop(target);
        return;
      }

      insertBlock(target, { id: item.id, index });
    },
    collect: monitor => ({
      isOver: monitor.isOver() && monitor.getItemType() === TargetType.Library,
    }),
  });

  return (
    <span
      data-composify-role="droppable"
      data-composify-active={isDragging}
      data-composify-dragging={focusedBlock?.id == item.id}
      ref={node => {
        dropRef(node);
      }}
      className={getClassName({
        active: isDragging,
        over: isOver,
      })}
      {...props}
    />
  );
};
