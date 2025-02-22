import { ClassNames } from '../Constants';
import { useEditing } from '../EditingContext';

export const DroppableStyle = () => {
  const { isDragging, isAltDown } = useEditing();

  return (
    <style>
      {`
        .${ClassNames.Droppable}:first-child {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .${ClassNames.Droppable}:only-child {
          position: static;
          min-width: 16px;
          min-height: 16px;
          width: 100%;
          height: 100%;
        }
      `}
      {isDragging &&
        `
          .${ClassNames.Droppable} {
            position: static;
            min-width: 16px;
            min-height: 16px;
          }

          .${ClassNames.Droppable}:not(:first-child) {
            border: 1px dotted #376DFA;
          }
        `}
      {isDragging &&
        isAltDown &&
        `
          .${ClassNames.Droppable}:first-child:not(:only-child) {
            display: none;
          }
      `}
    </style>
  );
};
