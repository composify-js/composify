import { useState, type FC } from 'react';
import { CloudEditorControl } from '../CloudEditorControl';
import { CloudEditorEventHandler } from '../CloudEditorEventHandler';
import { CloudEditorInitializer } from '../CloudEditorInitializer';
import { type EditingRef } from '../EditingContext';
import { Editor } from '../Editor';
import { type VisualEditorProps } from '../VisualEditor';

type Props = VisualEditorProps;

export const CloudEditor: FC<Props> = ({ viewports }) => {
  const [editingRef, setEditingRef] = useState<EditingRef | null>(null);
  const [title, setTitle] = useState('Untitled');

  return (
    <>
      <Editor
        ref={setEditingRef}
        title={title}
        source="<></>"
        viewports={viewports}
        renderControl={() => (editingRef ? <CloudEditorControl getSource={editingRef.getSource} /> : null)}
      />
      <CloudEditorInitializer />
      {editingRef && (
        <CloudEditorEventHandler
          setTitle={setTitle}
          replaceRoot={editingRef.replaceRoot}
          getSource={editingRef.getSource}
        />
      )}
    </>
  );
};
