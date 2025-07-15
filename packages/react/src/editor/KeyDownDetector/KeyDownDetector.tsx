import { useEffect, startTransition } from 'react';
import { useEditing } from '../EditingContext';
import { useWindow } from '../WindowContext';

export const KeyDownDetector = () => {
  const { windows } = useWindow();
  const { setIsDragging, setDraggingNodeId } = useEditing();

  useEffect(() => {
    let isDragging = false;

    const handleMouseUp = () => {
      startTransition(() => {
        isDragging = false;

        setIsDragging(false);
        setDraggingNodeId(undefined);
      });
    };

    const handleDragStart = () => {
      startTransition(() => {
        isDragging = true;

        setIsDragging(true);
      });
    };

    const handleDragEnd = () => {
      startTransition(() => {
        isDragging = false;

        setIsDragging(false);
        setDraggingNodeId(undefined);
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (event.buttons === 0 && isDragging) {
        startTransition(() => {
          isDragging = false;

          setIsDragging(false);
          setDraggingNodeId(undefined);
        });
      }
    };

    windows.forEach(window => {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('dragstart', handleDragStart);
      window.addEventListener('dragend', handleDragEnd);
      window.addEventListener('drop', handleDragEnd);
    });

    return () => {
      windows.forEach(window => {
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('dragstart', handleDragStart);
        window.removeEventListener('dragend', handleDragEnd);
        window.removeEventListener('drop', handleDragEnd);
      });
    };
  }, [windows, setIsDragging, setDraggingNodeId]);

  return null;
};
