import { useCallback, useEffect, useRef } from 'react';
import { type Bridge, type BridgeEventHandler } from './Bridge';
import { type BridgeEventType, type BridgeEvent } from './BridgeEvent';
import { getBridge } from './BridgeManager';

export const useBridge = (target: Window) => {
  const bridgeRef = useRef<Bridge>(null);

  const emit = useCallback((event: BridgeEvent) => {
    bridgeRef.current?.emit(event);
  }, []);

  const addListener = useCallback(
    <EventType extends BridgeEventType>(
      type: EventType,
      listener: BridgeEventHandler<Extract<BridgeEvent, { type: EventType }>>
    ) => {
      const bridge = bridgeRef.current;

      if (!bridge) {
        return () => null;
      }

      bridge.addListener(type, listener);

      return () => {
        bridge.removeListener(type, listener);
      };
    },
    []
  );

  useEffect(() => {
    const { bridge, release } = getBridge(target);

    bridgeRef.current = bridge;

    return release;
  }, [target]);

  return {
    emit,
    addListener,
  };
};
