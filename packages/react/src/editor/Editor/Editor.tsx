import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import { EditingProvider } from '../EditingContext';
import { IsolatedDndProvider } from '../IsolatedDndProvider';
import { KeyDownDetector } from '../KeyDownDetector';
import { PanelLeft, PanelLeftProps } from '../PanelLeft';
import { PanelRight, PanelRightProps } from '../PanelRight';
import { Theme } from '../Theme';
import { VisualEditor, VisualEditorProps } from '../VisualEditor';
import { WindowProvider } from '../WindowContext';
import styles from './Editor.module.css';

const getClassName = getClassNameFactory('Editor', styles);

type Props = PanelLeftProps &
  PanelRightProps &
  VisualEditorProps & {
    source: string;
  };

export const Editor: FC<Props> = ({ title, source, viewports, renderControl, onSubmit }) => (
  <WindowProvider>
    <IsolatedDndProvider>
      <EditingProvider source={source}>
        <main className={getClassName()}>
          <PanelLeft title={title} />
          <VisualEditor viewports={viewports} />
          <PanelRight renderControl={renderControl} onSubmit={onSubmit} />
        </main>
        <KeyDownDetector />
        <Theme />
      </EditingProvider>
    </IsolatedDndProvider>
  </WindowProvider>
);
