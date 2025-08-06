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
  const targetRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);

  const autoScale = useCallback(() => {
    if (!containerRef.current || !targetRef.current) {
      return;
    }

    const containerBox = getBox(containerRef.current).contentBox;

    const scale = Math.min(containerBox.width / width, 1);
    const height = containerBox.height / scale;

    setScale(scale);
    setHeight(height);
  }, [width]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(autoScale);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [autoScale]);

  return (
    <>
      <div ref={containerRef} className={getClassName('Container')} />
      <div
        ref={targetRef}
        className={getClassName('Target')}
        style={{
          width,
          height,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </>
  );
};
