import { FC } from 'react';
import { EditingProvider } from '../EditingContext';
import { IsolatedDndProvider } from '../IsolatedDndProvider';
import { KeyDownDetector } from '../KeyDownDetector';
import { Theme } from '../Theme';
import { VisualEditor } from '../VisualEditor';
import { WindowProvider } from '../WindowContext';

type Props = {
  title: string;
  source: string;
};

export const Editor: FC<Props> = ({ title, source }) => (
  <WindowProvider>
    <IsolatedDndProvider>
      <EditingProvider source={source}>
        <VisualEditor title={title} />
        <KeyDownDetector />
        <Theme />
      </EditingProvider>
    </IsolatedDndProvider>
  </WindowProvider>
);
