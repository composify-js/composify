import { useEffect } from 'react';
import { useEditing } from '../EditingContext';

export const KeyDownDetector = () => {
  const { setIsAltDown, setIsDragging } = useEditing();

  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (key === 'Alt') {
        setIsAltDown(true);
      }
    };

    const handleKeyUp = ({ key }: KeyboardEvent) => {
      if (key === 'Alt') {
        setIsAltDown(false);
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      setIsAltDown(event.altKey);
    };

    const handleDrag = (event: DragEvent) => {
      setIsAltDown(event.altKey);
    };

    const handleDragStart = () => {
      setIsDragging(true);
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('drag', handleDrag);
    window.addEventListener('dragover', handleDrag);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('dragend', handleDragEnd);
    window.addEventListener('drop', handleDragEnd);

    return () => {
      console.log('cleanup');
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('drag', handleDrag);
      window.removeEventListener('dragover', handleDrag);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('dragend', handleDragEnd);
      window.removeEventListener('drop', handleDragEnd);
    };
  }, [setIsAltDown, setIsDragging]);

  return null;
};
