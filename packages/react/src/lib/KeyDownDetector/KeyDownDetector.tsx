import { useEffect } from 'react';
import { useEditing } from '../EditingContext';

export const KeyDownDetector = () => {
  const { setIsAltDown } = useEditing();

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

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('drag', handleDrag);
    window.addEventListener('dragover', handleDrag);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('drag', handleDrag);
      window.removeEventListener('dragover', handleDrag);
    };
  }, [setIsAltDown]);

  return null;
};
