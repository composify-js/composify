import { getClassNameFactory } from '@composify/utils';
import { type FC, useState } from 'react';
import { CodeEditor } from '../CodeEditor';
import { EditingProvider } from '../EditingContext';
import { type EditMode } from '../EditorControl';
import { IsolatedDndProvider } from '../IsolatedDndProvider';
import { KeyDownDetector } from '../KeyDownDetector';
import { PanelLeft, type PanelLeftProps } from '../PanelLeft';
import { PanelRight, type PanelRightProps } from '../PanelRight';
import { Theme } from '../Theme';
import { VisualEditor, type VisualEditorProps } from '../VisualEditor';
import { WindowProvider } from '../WindowContext';
import styles from './Editor.module.css';

const getClassName = getClassNameFactory('Editor', styles);

type Props = PanelLeftProps &
  Omit<PanelRightProps, 'mode' | 'setMode'> &
  VisualEditorProps & {
    source: string;
  };

export const Editor: FC<Props> = ({ title, source, viewports, renderControl, onSubmit }) => {
  const [mode, setMode] = useState<EditMode>('visual');

  return (
    <WindowProvider>
      <IsolatedDndProvider>
        <EditingProvider source={source}>
          <main className={getClassName()}>
            <PanelLeft title={title} />
            {mode !== 'code' && <VisualEditor viewports={viewports} />}
            {mode === 'split' && <div className={getClassName('Divider')} />}
            {mode !== 'visual' && <CodeEditor />}
            <PanelRight mode={mode} setMode={setMode} renderControl={renderControl} onSubmit={onSubmit} />
          </main>
          <KeyDownDetector />
          <Theme />
        </EditingProvider>
      </IsolatedDndProvider>
    </WindowProvider>
  );
};
