import { useCallback, useEffect } from 'react';
import { type BridgeEventHandler } from './Bridge';
import { type BridgeEventType, type BridgeEvent } from './BridgeEvent';
import { getBridge } from './BridgeManager';

export const useBridge = (target: Window) => {
  const emit = useCallback(
    (event: BridgeEvent) => {
      const { bridge } = getBridge(target);

      bridge.emit(event);
    },
    [target]
  );

  const addListener = useCallback(
    <EventType extends BridgeEventType>(
      type: EventType,
      listener: BridgeEventHandler<Extract<BridgeEvent, { type: EventType }>>
    ) => {
      const { bridge } = getBridge(target);

      bridge.addListener(type, listener);

      return () => {
        bridge.removeListener(type, listener);
      };
    },
    [target]
  );

  useEffect(() => {
    const { release } = getBridge(target);

    return release;
  }, [target]);

  return {
    emit,
    addListener,
  };
};
