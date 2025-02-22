import { FC } from 'react';
import { Canvas } from '../Canvas';
import { DraggableStyle } from '../DraggableStyle';
import { DroppableStyle } from '../DroppableStyle';
import { EditingProvider } from '../EditingContext';
import { IsolatedDndProvider } from '../IsolatedDndProvider';
import { KeyDownDetector } from '../KeyDownDetector';
import { Library } from '../Library';

type Props = {
  source: string;
};

export const Editor: FC<Props> = ({ source }) => (
  <IsolatedDndProvider>
    <EditingProvider source={source}>
      <DraggableStyle />
      <DroppableStyle />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Library />
        <div style={{ flex: 1 }}>
          <Canvas />
        </div>
      </div>
      <KeyDownDetector />
    </EditingProvider>
  </IsolatedDndProvider>
);
