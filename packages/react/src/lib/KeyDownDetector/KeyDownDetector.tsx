import { useEffect, startTransition } from 'react';
import { useEditing } from '../EditingContext';

export const KeyDownDetector = () => {
  const { setIsDragging, setTargetId } = useEditing();

  useEffect(() => {
    let isDragging = false;

    const handleMouseUp = () => {
      startTransition(() => {
        isDragging = false;

        setIsDragging(false);
        setTargetId(undefined);
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
        setTargetId(undefined);
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (event.buttons === 0 && isDragging) {
        startTransition(() => {
          isDragging = false;

          setIsDragging(false);
          setTargetId(undefined);
        });
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('dragend', handleDragEnd);
    window.addEventListener('drop', handleDragEnd);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('dragend', handleDragEnd);
      window.removeEventListener('drop', handleDragEnd);
    };
  }, [setIsDragging, setTargetId]);

  return null;
};
