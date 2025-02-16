import { ClassNames } from '../Constants';

export const DroppableStyle = () => (
  <style>
    {`
      .${ClassNames.DroppableContainer} {
        position: relative;
        display: flex;
        flex-grow: 0;
        flex-shrink: 0;
        align-self: stretch;
      }

      .${ClassNames.Droppable} {
        position: absolute;
      }
    `}
  </style>
);
