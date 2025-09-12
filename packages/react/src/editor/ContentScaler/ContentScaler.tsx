import { getBox } from 'css-box-model';
import { type FC, type PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getClassNameFactory } from '../../utils';
import styles from './ContentScaler.module.css';

const getClassName = getClassNameFactory('ContentScaler', styles);

type Props = PropsWithChildren<{
  width: number;
  height: number;
}>;

export const ContentScaler: FC<Props> = ({ width, height, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  const targetWidth = useMemo(() => {
    if (!target) {
      return width;
    }

    const original = target.children[0] as HTMLElement;
    const originalBox = getBox(original).contentBox;

    return originalBox.width;
  }, [target, width]);

  const targetHeight = useMemo(() => {
    if (!target) {
      return height;
    }

    const original = target.children[0] as HTMLElement;
    const originalBox = getBox(original).contentBox;

    return originalBox.height;
  }, [target, height]);

  const autoScale = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const containerBox = getBox(containerRef.current).contentBox;
    const scale = Math.min(containerBox.width / targetWidth, containerBox.height / targetHeight, 1);

    setScale(scale);
  }, [targetWidth, targetHeight]);

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
        ref={setTarget}
        className={getClassName('Target')}
        style={{
          width: targetWidth,
          height: targetHeight,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </>
  );
};
