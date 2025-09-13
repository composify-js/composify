import { useEffect, useRef, useState, type FC } from 'react';
import { Parser } from '../../renderer';
import { Bridge, GuestEventType, HostEventType } from '../../utils';
import { type EditingRef } from '../EditingContext';
import { Editor } from '../Editor';
import { type VisualEditorProps } from '../VisualEditor';

type Props = VisualEditorProps;

export const CloudEditor: FC<Props> = ({ viewports }) => {
  const editingRef = useRef<EditingRef>(null);
  const [title, setTitle] = useState('Untitled');

  useEffect(() => {
    if (!editingRef.current) {
      return;
    }

    const bridge = new Bridge(window.parent);

    const { addListener, emit } = bridge;
    const { replaceRoot, getSource } = editingRef.current;

    addListener(HostEventType.Initialize, data => {
      setTitle(data.title);
      replaceRoot(Parser.parse(data.content));
    });

    addListener(HostEventType.ContentRequested, () => {
      emit({
        type: GuestEventType.ContentProvided,
        content: getSource(),
      });
    });

    emit({ type: GuestEventType.Ready });

    return bridge.dispose;
  }, []);

  return <Editor ref={editingRef} title={title} source="<></>" viewports={viewports} renderControl={() => null} />;
};
