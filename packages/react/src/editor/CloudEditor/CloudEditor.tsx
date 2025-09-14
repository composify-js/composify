import { useEffect, useState, type FC } from 'react';
import { Parser } from '../../renderer';
import { Bridge, GuestEventType, HostEventType } from '../../utils';
import { type EditingRef } from '../EditingContext';
import { Editor } from '../Editor';
import { type VisualEditorProps } from '../VisualEditor';

type Props = VisualEditorProps;

export const CloudEditor: FC<Props> = ({ viewports }) => {
  const [editingRef, setEditingRef] = useState<EditingRef | null>(null);
  const [title, setTitle] = useState('Untitled');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!editingRef) {
      return;
    }

    const bridge = new Bridge(window.parent);

    const { replaceRoot, getSource } = editingRef;
    const { on, emit, dispose } = bridge;

    on(HostEventType.Initialize, data => {
      setTitle(data.title);
      replaceRoot(Parser.parse(data.content));
    });

    on(HostEventType.ContentRequested, () => {
      emit({
        type: GuestEventType.ContentProvided,
        content: getSource(),
      });
    });

    requestAnimationFrame(() => {
      if (!initialized) {
        emit({ type: GuestEventType.Ready });
        setInitialized(true);
      }
    });

    return dispose;
  }, [editingRef, initialized]);

  return <Editor ref={setEditingRef} title={title} source="<></>" viewports={viewports} renderControl={() => null} />;
};
