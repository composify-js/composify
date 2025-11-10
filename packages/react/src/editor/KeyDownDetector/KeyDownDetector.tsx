import { startTransition, useEffect } from 'react';
import { TargetType } from '../Constants';
import { useEditing } from '../EditingContext';
import { useWindow } from '../WindowContext';

export const KeyDownDetector = () => {
  const { windows } = useWindow();
  const { focusBlock } = useEditing();

  useEffect(() => {
    let isDragging = false;

    const handleMouseUp = () => {
      startTransition(() => {
        isDragging = false;

        focusBlock(undefined);
      });
    };

    const handleDragStart = () => {
      startTransition(() => {
        isDragging = true;

        focusBlock(TargetType.Library);
      });
    };

    const handleDragEnd = () => {
      startTransition(() => {
        isDragging = false;

        focusBlock(undefined);
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (event.buttons === 0 && isDragging) {
        startTransition(() => {
          isDragging = false;

          focusBlock(undefined);
        });
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (target?.closest('[draggable="true"]')) {
        event.preventDefault();
      }
    };

    windows.forEach((window) => {
      window.addEventListener('click', handleClick, true);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('dragstart', handleDragStart);
      window.addEventListener('dragend', handleDragEnd);
      window.addEventListener('drop', handleDragEnd);
    });

    return () => {
      windows.forEach((window) => {
        window.removeEventListener('click', handleClick, true);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('dragstart', handleDragStart);
        window.removeEventListener('dragend', handleDragEnd);
        window.removeEventListener('drop', handleDragEnd);
      });
    };
  }, [windows, focusBlock]);

  return null;
};
