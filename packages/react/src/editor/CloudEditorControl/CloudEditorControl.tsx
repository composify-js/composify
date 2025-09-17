import { type FC, useCallback, useEffect, useRef } from 'react';
import { Bridge, getClassNameFactory, GuestEventType } from '../../utils';
import styles from './CloudEditorControl.module.css';

const getClassName = getClassNameFactory('CloudEditorControl', styles);

type Props = {
  getSource: () => string;
};

export const CloudEditorControl: FC<Props> = ({ getSource }) => {
  const bridgeRef = useRef<Bridge | null>(null);

  const handleClickSettings = useCallback(() => {
    bridgeRef.current?.emit({ type: GuestEventType.SettingsClicked });
  }, []);

  const handleClickSave = useCallback(() => {
    bridgeRef.current?.emit({
      type: GuestEventType.SaveClicked,
      content: getSource(),
    });
  }, [getSource]);

  useEffect(() => {
    bridgeRef.current = new Bridge(window.parent);

    return bridgeRef.current.dispose;
  }, []);

  return (
    <div className={getClassName()}>
      <button type="button" className={getClassName('SettingsButton')} onClick={handleClickSettings}>
        Settings
      </button>
      <button type="button" className={getClassName('SaveButton')} onClick={handleClickSave}>
        Save
      </button>
    </div>
  );
};
