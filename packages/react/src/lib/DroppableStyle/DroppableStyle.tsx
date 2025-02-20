import { ClassNames } from '../Constants';

export const DroppableStyle = () => (
  <style>
    {`
    .${ClassNames.Droppable} {
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
);
