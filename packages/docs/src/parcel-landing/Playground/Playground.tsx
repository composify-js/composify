import '@composify/react/style.css';
import { Editor, useComposifyEditor } from '@composify/react/editor';
import clsx from 'clsx';
import { getBox } from 'css-box-model';
import { type FC, useEffect, useRef, useState } from 'react';
import { SourceEditor, useSource } from '../SourceContext';
import styles from './Playground.module.css';

const PLAYGROUND_WIDTH = 1293;

type Props = {
  plain?: boolean;
};

export const Playground: FC<Props> = ({ plain }) => {
  const previewRef = useRef<HTMLDivElement>(null);

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
      if (!previewRef.current) {
        return;
      }

      const box = getBox(previewRef.current);
      const scale = Math.min(box.contentBox.width / PLAYGROUND_WIDTH, 1);

      setScale(scale);
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        autoResize();
        autoScale();
      });
    });

    if (previewRef.current) {
      resizeObserver.observe(previewRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className={clsx(styles.container, plain && styles.plain)}>
      <div ref={previewRef} className={styles.preview} style={{ aspectRatio }}>
        {isLibrary || isVisualEditor ? (
          <div className={styles.mock}>
            <h2 className={styles.mockTitle}>🎨 Playground</h2>
          </div>
        ) : (
          <>
            <div className={styles.desktop}>
              <SourceEditor />
            </div>
            <div
              className={styles.mobile}
              style={{
                width: PLAYGROUND_WIDTH,
                aspectRatio,
                transform: `scale(${scale})`,
              }}
            >
              <Editor
                title="Home Page"
                source={source}
                viewports={[
                  {
                    width: 425,
                    label: 'Mobile - 425px',
                  },
                  {
                    width: 768,
                    label: 'Tablet - 768px',
                    initial: true,
                  },
                  {
                    width: 1024,
                    label: 'Laptop - 1024px',
                  },
                  {
                    width: 1440,
                    label: 'Desktop - 1440px',
                  },
                ]}
                onSubmit={setSource}
              />
            </div>
          </>
        )}
      </div>
      {!plain && <p className={styles.description}>Make a change, hit save, and... tada! 🎉</p>}
    </section>
  );
};
