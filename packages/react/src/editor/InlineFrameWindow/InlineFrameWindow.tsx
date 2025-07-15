import { memo, useEffect } from 'react';
import { useInlineFrame } from '../InlineFrame';
import { useWindow } from '../WindowContext';

export const InlineFrameWindow = memo(() => {
  const { window } = useInlineFrame();
  const { addWindow } = useWindow();

  useEffect(() => {
    if (window) {
      addWindow(window);
    }
  }, [window, addWindow]);

  return null;
});

InlineFrameWindow.displayName = 'InlineFrameWindow';
