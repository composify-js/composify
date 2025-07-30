import { getClassNameFactory } from '@composify/utils';
import { getBox } from 'css-box-model';
import { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import styles from './ViewportScaler.module.css';

const getClassName = getClassNameFactory('ViewportScaler', styles);

type Props = PropsWithChildren<{
  width: number;
}>;

export const ViewportScaler: FC<Props> = ({ width, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const autoScale = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const box = getBox(containerRef.current);
    const scale = Math.min(box.contentBox.width / width, 2);

    setScale(scale);
  }, [width]);

  useEffect(() => {
    requestAnimationFrame(autoScale);
  }, [autoScale]);

  useEffect(() => {
    window.addEventListener('resize', autoScale);

    return () => window.removeEventListener('resize', autoScale);
  }, [autoScale]);

  return (
    <>
      <div ref={containerRef} className={getClassName('Container')} />
      <div
        className={getClassName('Target')}
        style={{
          width,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </>
  );
};
