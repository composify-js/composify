import { Bridge, GuestEventType } from '@composify/react/utils';
import { type FC, useEffect, useState } from 'react';

export const CloudEditorInitializer: FC = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const bridge = new Bridge(window.parent);

    requestAnimationFrame(() => {
      if (initialized) {
        return;
      }

      bridge.emit({ type: GuestEventType.Ready });
      setInitialized(true);
    });

    return bridge.dispose;
  }, [initialized]);

  return null;
};
