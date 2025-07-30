import { getClassNameFactory } from '@composify/utils';
import { getBox } from 'css-box-model';
import { FC, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import styles from './ContentScaler.module.css';

const getClassName = getClassNameFactory('ContentScaler', styles);

type Props = PropsWithChildren<{
  width: number;
  height: number;
}>;

export const ContentScaler: FC<Props> = ({ width, height, children }) => {
  const originalRef = useRef<HTMLDivElement>(null);

  const autoScale = useCallback(() => {
    if (!originalRef.current) {
      return;
    }

    const original = originalRef.current.children[0] as HTMLElement;
    const box = getBox(original);

    const scaleX = width / box.contentBox.width;
    const scaleY = height / box.contentBox.height;

    original.style.transform = `scale(${Math.min(scaleX, scaleY)})`;
  }, [width, height]);

  useEffect(() => {
    requestAnimationFrame(autoScale);
  }, [autoScale]);

  return (
    <div ref={originalRef} className={getClassName()}>
      {children}
    </div>
  );
};
