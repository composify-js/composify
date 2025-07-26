import { FC } from 'react';
import { EditingProvider } from '../EditingContext';
import { IsolatedDndProvider } from '../IsolatedDndProvider';
import { KeyDownDetector } from '../KeyDownDetector';
import { Theme } from '../Theme';
import { VisualEditor } from '../VisualEditor';
import { WindowProvider } from '../WindowContext';

type Props = {
  source: string;
};

export const Editor: FC<Props> = ({ source }) => (
  <WindowProvider>
    <IsolatedDndProvider>
      <EditingProvider source={source}>
        <KeyDownDetector />
        <VisualEditor />
        <Theme />
      </EditingProvider>
    </IsolatedDndProvider>
  </WindowProvider>
);
