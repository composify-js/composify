import type { FC, ReactNode } from 'react';
import { ActiveBlockControl } from '../ActiveBlockControl';
import { type EditMode, EditorControl } from '../EditorControl';
import { Outline } from '../Outline';
import { PropertyLibrary } from '../PropertyLibrary';
import styles from './PanelRight.module.css';

export type Props = {
  mode: EditMode;
  setMode: (mode: EditMode) => void;
  renderControl?: (getSource: () => string) => ReactNode;
  onSubmit?: (source: string) => void;
};

export const PanelRight: FC<Props> = ({ mode, setMode, renderControl, onSubmit }) => (
  <section className={styles.container}>
    <EditorControl mode={mode} setMode={setMode} renderControl={renderControl} onSubmit={onSubmit} />
    <ActiveBlockControl />
    <PropertyLibrary />
    <Outline />
  </section>
);
