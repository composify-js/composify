import { getBox } from 'css-box-model';
import { type FC, type PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import styles from './ViewportScaler.module.css';

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
    const height = scale > 0 ? containerBox.height / scale : 0;

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
      <div ref={containerRef} className={styles.container} />
      <div
        ref={targetRef}
        className={styles.target}
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
