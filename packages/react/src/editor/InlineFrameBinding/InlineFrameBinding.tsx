import { memo, useEffect, useMemo } from 'react';
import { useDragDropManager } from 'react-dnd';
import { useWindow } from '../WindowContext';

export const InlineFrameBinding = memo(() => {
  const { windows } = useWindow();

  const manager = useDragDropManager();
  const backend = manager.getBackend() as unknown as {
    addEventListeners: (window?: Window) => void;
    removeEventListeners: (window?: Window) => void;
  };

  const iframeWindows = useMemo(() => windows.filter(item => item !== window), [windows]);

  useEffect(() => {
    iframeWindows.forEach(item => backend.addEventListeners(item));

    return () => {
      iframeWindows.forEach(item => backend.removeEventListeners(item));
    };
  }, [iframeWindows, backend]);

  return null;
});

InlineFrameBinding.displayName = 'InlineFrameBinding';
