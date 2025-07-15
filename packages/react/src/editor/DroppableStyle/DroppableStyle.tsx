import { ClassNames } from '../Constants';
import { useEditing } from '../EditingContext';

export const DroppableStyle = () => {
  const { draggingNodeId, isDragging } = useEditing();

  return (
    <>
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
      </style>
      <style>
        {isDragging &&
          `
            .${ClassNames.Droppable} {
              position: static;
              min-width: 16px;
              min-height: 16px;
            }

            .${ClassNames.Droppable}[data-item-id="${draggingNodeId}"]:not(:only-child),
            .${ClassNames.Draggable}[data-item-id="${draggingNodeId}"] .${ClassNames.Droppable}:not(:only-child),
            .${ClassNames.Draggable}[data-item-id="${draggingNodeId}"]+.${ClassNames.Droppable},
            .${ClassNames.Droppable}:not(:only-child):has(+ .${ClassNames.Draggable}[data-item-id="${draggingNodeId}"]) {
              display: none;
            }

            .${ClassNames.Droppable}:not(:first-child) {
              border: 1px dotted #376DFA;
            }

            .${ClassNames.Droppable}:last-child:not(:only-child) {
              flex: 1;
            }

            .${ClassNames.Droppable}:first-child:not(:only-child) {
              display: none;
            }
          `}
      </style>
    </>
  );
};
