import { FC } from 'react';
import { CanvasEditor } from '../CanvasEditor';
import { EditingProvider } from '../EditingContext';
import { IsolatedDndProvider } from '../IsolatedDndProvider';
import { KeyDownDetector } from '../KeyDownDetector';
import { WindowProvider } from '../WindowContext';
import './Editor.module.css';

type Props = {
  source: string;
};

export const Editor: FC<Props> = ({ source }) => (
  <WindowProvider>
    <IsolatedDndProvider>
      <EditingProvider source={source}>
        <KeyDownDetector />
        <CanvasEditor />
      </EditingProvider>
    </IsolatedDndProvider>
  </WindowProvider>
);
