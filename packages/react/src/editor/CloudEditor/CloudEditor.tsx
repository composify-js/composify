import { useCallback, useEffect, useRef, useState, type FC } from 'react';
import { Parser } from '../../renderer';
import { Bridge, getClassNameFactory, GuestEventType, HostEventType } from '../../utils';
import { type EditingRef } from '../EditingContext';
import { Editor } from '../Editor';
import { type VisualEditorProps } from '../VisualEditor';
import styles from './CloudEditor.module.css';

const getClassName = getClassNameFactory('CloudEditor', styles);

type Props = VisualEditorProps;

export const CloudEditor: FC<Props> = ({ viewports }) => {
  const bridgeRef = useRef<Bridge | null>(null);

  const [editingRef, setEditingRef] = useState<EditingRef | null>(null);
  const [title, setTitle] = useState('Untitled');
  const [initialized, setInitialized] = useState(false);

  const handleClickSettings = useCallback(() => {
    if (!bridgeRef.current) {
      return;
    }

    bridgeRef.current.emit({ type: GuestEventType.SettingsClicked });
  }, []);

  const handleClickSave = useCallback(() => {
    if (!bridgeRef.current || !editingRef) {
      return;
    }

    bridgeRef.current.emit({
      type: GuestEventType.SaveClicked,
      content: editingRef.getSource(),
    });
  }, [editingRef]);

  useEffect(() => {
    if (!editingRef) {
      return;
    }

    bridgeRef.current = new Bridge(window.parent);

    const { replaceRoot, getSource } = editingRef;
    const { on, emit, dispose } = bridgeRef.current;

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

  return (
    <Editor
      ref={setEditingRef}
      title={title}
      source="<></>"
      viewports={viewports}
      renderControl={() => (
        <div className={getClassName('Controls')}>
          <button type="button" className={getClassName('SettingsButton')} onClick={handleClickSettings}>
            Settings
          </button>
          <button type="button" className={getClassName('SaveButton')} onClick={handleClickSave}>
            Save
          </button>
        </div>
      )}
    />
  );
};
