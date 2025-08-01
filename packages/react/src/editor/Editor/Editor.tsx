import { getClassNameFactory } from '@composify/utils';
import { FC, useState } from 'react';
import { CodeEditor } from '../CodeEditor';
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
  Omit<PanelRightProps, 'mode' | 'setMode'> &
  VisualEditorProps & {
    source: string;
  };

export const Editor: FC<Props> = ({ title, source, viewports, renderControl, onSubmit }) => {
  const [mode, setMode] = useState<'visual' | 'code'>('visual');

  return (
    <WindowProvider>
      <IsolatedDndProvider>
        <EditingProvider source={source}>
          <main className={getClassName()}>
            <PanelLeft title={title} />
            {mode === 'visual' && <VisualEditor viewports={viewports} />}
            {mode === 'code' && <CodeEditor />}
            <PanelRight mode={mode} setMode={setMode} renderControl={renderControl} onSubmit={onSubmit} />
          </main>
          <KeyDownDetector />
          <Theme />
        </EditingProvider>
      </IsolatedDndProvider>
    </WindowProvider>
  );
};
