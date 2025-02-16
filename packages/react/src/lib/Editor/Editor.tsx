import { Attributes, createElement, FC, ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { DraggableStyle } from '../DraggableStyle';
import { Droppable } from '../Droppable';
import { DroppableStyle } from '../DroppableStyle';
import { EditingProvider } from '../EditingContext';
import { Parcel } from '../Parcel';

type Props = {
  source: string;
};

export const Editor: FC<Props> = ({ source }) => {
  const pragma = {
    jsx: (type: string, props: Attributes | null, ...children: ReactNode[]) =>
      createElement(Draggable, { type: TargetType.Canvas, key: props?.key }, createElement(type, props, children)),
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <EditingProvider>
        <DraggableStyle />
        <DroppableStyle />
        <Parcel source={source} pragma={pragma} />
        <Droppable direction="horizontal" />
      </EditingProvider>
    </DndProvider>
  );
};
