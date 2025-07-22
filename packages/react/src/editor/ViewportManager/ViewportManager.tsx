import { getClassNameFactory } from '@composify/utils';
import { getBox } from 'css-box-model';
import { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { ViewportControl, ViewportControlProps } from '../ViewportControl';
import styles from './ViewportManager.module.css';

type Props = PropsWithChildren<Pick<ViewportControlProps, 'viewports'>>;

const getClassName = getClassNameFactory('ViewportManager', styles);

export const ViewportManager: FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [width, setWidth] = useState(375);

  const autoScale = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const container = getBox(containerRef.current);
    const scale = Math.min(container.contentBox.width / width, 2);

    setScale(scale);
  }, [width]);

  useEffect(autoScale, [autoScale]);

  useEffect(() => {
    window.addEventListener('resize', autoScale);

    return () => {
      window.removeEventListener('resize', autoScale);
    };
  }, [autoScale]);

  return (
    <section ref={containerRef} className={getClassName('Container')}>
      <ViewportControl onClick={setWidth} />
      <div
        className={getClassName('Target')}
        style={{
          width,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </section>
  );
};
