import '@composify/react/style.css';

import { Editor, useComposifyEditor } from '@composify/react';
import { FC } from 'react';
import { useSource } from '../SourceContext';
import { ViewportScaler } from '../ViewportScaler';
import styles from './Playground.module.css';

const PLAYGROUND_WIDTH = 1354;

export const Playground: FC = () => {
  const { source, setSource } = useSource();
  const { isLibrary, isVisualEditor } = useComposifyEditor();

  return (
    <section className={styles.playground}>
      <div className={styles.preview}>
        <ViewportScaler width={PLAYGROUND_WIDTH}>
          {isLibrary || isVisualEditor ? (
            <div className={styles.mock}>
              <h2 className={styles.mockTitle}>🎨 Playground</h2>
            </div>
          ) : (
            <Editor title="Home Page" source={source} onSubmit={setSource} />
          )}
        </ViewportScaler>
      </div>
      <p className={styles.description}>Make a change, hit save, and... tada! 🎉</p>
    </section>
  );
};
