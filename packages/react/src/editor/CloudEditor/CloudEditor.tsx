import { useEffect, useRef, useState, type FC } from 'react';
import { Parser } from '../../renderer';
import { GuestEventType, HostEventType, useBridge } from '../../utils';
import { type EditingRef } from '../EditingContext';
import { Editor } from '../Editor';
import { type VisualEditorProps } from '../VisualEditor';

type Props = VisualEditorProps;

export const CloudEditor: FC<Props> = ({ viewports }) => {
  const editingRef = useRef<EditingRef>(null);
  const [title, setTitle] = useState('Untitled');
  const { emit, addListener } = useBridge(window.parent);

  useEffect(() => {
    if (!editingRef.current) {
      return;
    }

    const { replaceRoot, getSource } = editingRef.current;

    const removeInitializeListener = addListener(HostEventType.Initialize, data => {
      setTitle(data.title);
      replaceRoot(Parser.parse(data.content));
    });

    const removeContentRequestedListener = addListener(HostEventType.ContentRequested, () => {
      emit({
        type: GuestEventType.ContentProvided,
        content: getSource(),
      });
    });

    return () => {
      removeInitializeListener();
      removeContentRequestedListener();
    };
  }, [emit, addListener]);

  return <Editor ref={editingRef} title={title} source="<></>" viewports={viewports} renderControl={() => null} />;
};
