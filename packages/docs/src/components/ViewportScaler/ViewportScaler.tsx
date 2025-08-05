import { getBox } from 'css-box-model';
import { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import styles from './ViewportScaler.module.css';

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
    const scale = Math.min(box.contentBox.width / width, 1);

    setScale(scale);
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
        className={styles.target}
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
