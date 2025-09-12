import { Bridge } from './Bridge';

const bridgeCache = new Map<Window, { instance: Bridge; refCount: number }>();

export const getBridge = (target: Window, origin = '*') => {
  let cached = bridgeCache.get(target);

  if (!cached) {
    cached = {
      instance: new Bridge(target, origin),
      refCount: 0,
    };

    bridgeCache.set(target, cached);
  }

  cached.refCount++;

  return {
    bridge: cached.instance,
    release: () => {
      cached.refCount--;

      if (cached.refCount === 0) {
        cached.instance.dispose();
        bridgeCache.delete(target);
      }
    },
  };
};
