import { FC } from 'react';
import { Canvas } from '../Canvas';
import { ClassNames } from '../Constants';
import { DraggableStyle } from '../DraggableStyle';
import { DroppableStyle } from '../DroppableStyle';
import { EditingProvider } from '../EditingContext';
import { EditorStyle } from '../EditorStyle';
import { InlineFrame } from '../InlineFrame';
import { InlineFrameBinding } from '../InlineFrameBinding';
import { InlineFrameWindow } from '../InlineFrameWindow';
import { IsolatedDndProvider } from '../IsolatedDndProvider';
import { KeyDownDetector } from '../KeyDownDetector';
import { Library } from '../Library';
import { WindowProvider } from '../WindowContext';

type Props = {
  source: string;
};

export const Editor: FC<Props> = ({ source }) => (
  <WindowProvider>
    <IsolatedDndProvider>
      <EditingProvider source={source}>
        <DraggableStyle />
        <DroppableStyle />
        <EditorStyle />
        <KeyDownDetector />
        <main className={ClassNames.Editor}>
          <Library />
          <InlineFrame>
            <InlineFrameWindow />
            <InlineFrameBinding />
            <DraggableStyle />
            <DroppableStyle />
            <EditorStyle />
            <Canvas />
          </InlineFrame>
        </main>
      </EditingProvider>
    </IsolatedDndProvider>
  </WindowProvider>
);
