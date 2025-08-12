import '@composify/react/style.css';

import { Editor, useComposifyEditor } from '@composify/react';
import { getBox } from 'css-box-model';
import { type FC, useEffect, useRef, useState } from 'react';
import { Backdrop } from '../Backdrop';
import { useSource } from '../SourceContext';
import styles from './Playground.module.css';

const PLAYGROUND_WIDTH = 1354;

export const Playground: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(1.75);

  const { source, setSource } = useSource();
  const { isLibrary, isVisualEditor } = useComposifyEditor();

  useEffect(() => {
    const autoResize = () => {
      const ratio = Math.max(window.innerWidth / window.innerHeight, 1.75);

      setAspectRatio(ratio);
    };

    const autoScale = () => {
      if (!containerRef.current) {
        return;
      }

      const box = getBox(containerRef.current);
      const scale = Math.min(box.contentBox.width / PLAYGROUND_WIDTH, 1);

      setScale(scale);
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        autoResize();
        autoScale();
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className={styles.playground}>
      <div
        ref={containerRef}
        className={styles.preview}
        style={{
          aspectRatio,
        }}
      >
        <div
          className={styles.viewport}
          style={{
            width: PLAYGROUND_WIDTH,
            aspectRatio,
            transform: `scale(${scale})`,
          }}
        >
          {isLibrary || isVisualEditor ? (
            <div className={styles.mock}>
              <h2 className={styles.mockTitle}>🎨 Playground</h2>
            </div>
          ) : (
            <Editor title="Home Page" source={source} onSubmit={setSource} />
          )}
        </div>
        {!isLibrary && !isVisualEditor && <Backdrop />}
      </div>
      <p className={styles.description}>Make a change, hit save, and... tada! 🎉</p>
    </section>
  );
};
