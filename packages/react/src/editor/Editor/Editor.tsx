import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import { Canvas } from '../Canvas';
import { EditingProvider } from '../EditingContext';
import { EditorStyle } from '../EditorStyle';
import { InlineFrame } from '../InlineFrame';
import { InlineFrameBinding } from '../InlineFrameBinding';
import { InlineFrameWindow } from '../InlineFrameWindow';
import { IsolatedDndProvider } from '../IsolatedDndProvider';
import { KeyDownDetector } from '../KeyDownDetector';
import { Library } from '../Library';
import { ViewportManager } from '../ViewportManager';
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
        <EditorStyle />
        <KeyDownDetector />
        <main className={getClassName()}>
          <Library />
          <ViewportManager>
            <InlineFrame>
              <InlineFrameWindow />
              <InlineFrameBinding />
              <EditorStyle />
              <Canvas />
            </InlineFrame>
          </ViewportManager>
        </main>
      </EditingProvider>
    </IsolatedDndProvider>
  </WindowProvider>
);
