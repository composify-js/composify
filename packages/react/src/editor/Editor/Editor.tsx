import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import { Canvas } from '../Canvas';
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
import { ViewportControl } from '../ViewportControl';
import { WindowProvider } from '../WindowContext';
import styles from './Editor.module.css';

type Props = {
  source: string;
};

const getClassName = getClassNameFactory('Editor', styles);

export const Editor: FC<Props> = ({ source }) => (
  <WindowProvider>
    <IsolatedDndProvider>
      <EditingProvider source={source}>
        <DraggableStyle />
        <DroppableStyle />
        <EditorStyle />
        <KeyDownDetector />
        <main className={getClassName()}>
          <Library />
          <InlineFrame>
            <InlineFrameWindow />
            <InlineFrameBinding />
            <DraggableStyle />
            <DroppableStyle />
            <EditorStyle />
            <ViewportControl />
            <Canvas />
          </InlineFrame>
        </main>
      </EditingProvider>
    </IsolatedDndProvider>
  </WindowProvider>
);
