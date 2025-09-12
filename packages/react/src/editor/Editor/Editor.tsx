import { forwardRef, useState } from 'react';
import { getClassNameFactory } from '../../utils';
import { CodeEditor } from '../CodeEditor';
import { EditingProvider, type EditingRef } from '../EditingContext';
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

export const Editor = forwardRef<EditingRef, Props>(({ title, source, viewports, renderControl, onSubmit }, ref) => {
  const [mode, setMode] = useState<EditMode>('visual');

  return (
    <WindowProvider>
      <IsolatedDndProvider>
        <EditingProvider ref={ref} source={source}>
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
});

Editor.displayName = 'Editor';
