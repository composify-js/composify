import { ClassNames } from '../Constants';

export const DroppableStyle = () => (
  <style>
    {`
      .${ClassNames.Droppable}:empty {
        content: '';
        min-width: 16px;
        min-height: 16px;
      }
    `}
  </style>
);
