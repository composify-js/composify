import { type FC, useCallback, useEffect, useRef } from 'react';
import { Button } from '../../preset';
import { Bridge, GuestEventType } from '../../utils';
import styles from './CloudEditorControl.module.css';

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
    <div className={styles.container}>
      <Button type="button" variant="outline" size="sm" onClick={handleClickSettings}>
        Settings
      </Button>
      <Button type="button" variant="primary" size="sm" onClick={handleClickSave}>
        Save
      </Button>
    </div>
  );
};
