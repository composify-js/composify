import { FC } from 'react';
import { Canvas } from '../Canvas';
import { ClassNames } from '../Constants';
import { DraggableStyle } from '../DraggableStyle';
import { DroppableStyle } from '../DroppableStyle';
import { EditingProvider } from '../EditingContext';
import { EditorStyle } from '../EditorStyle';
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
      <EditorStyle />
      <main className={ClassNames.Editor}>
        <Library />
        <Canvas />
      </main>
      <KeyDownDetector />
    </EditingProvider>
  </IsolatedDndProvider>
);
