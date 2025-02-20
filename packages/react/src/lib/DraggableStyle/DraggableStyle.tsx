import { ClassNames } from '../Constants';

export const DraggableStyle = () => (
  <style>
    {`
      .${ClassNames.Draggable} {
        display: contents;
      }

      .${ClassNames.Draggable} > * {
        position: relative;
      }

      .${ClassNames.Draggable} > *:hover::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 2px dashed #376DFA;
        z-index: 1;
        pointer-events: none;
      }
    `}
  </style>
);
