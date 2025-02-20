import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Canvas } from '../Canvas';
import { DraggableStyle } from '../DraggableStyle';
import { Droppable } from '../Droppable';
import { DroppableStyle } from '../DroppableStyle';
import { EditingProvider } from '../EditingContext';
import { Library } from '../Library';

type Props = {
  source: string;
};

export const Editor: FC<Props> = ({ source }) => (
  <DndProvider backend={HTML5Backend}>
    <EditingProvider source={source}>
      <DraggableStyle />
      <DroppableStyle />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Library />
        <div style={{ flex: 1 }}>
          <Canvas />
        </div>
      </div>
      <Droppable />
    </EditingProvider>
  </DndProvider>
);
