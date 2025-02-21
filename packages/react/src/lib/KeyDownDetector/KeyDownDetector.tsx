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

    const handleMouse = (event: MouseEvent) => {
      setIsAltDown(event.altKey);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mouseup', handleMouse);
    window.addEventListener('mousemove', handleMouse);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mouseup', handleMouse);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [setIsAltDown]);

  return null;
};
