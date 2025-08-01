import { getClassNameFactory } from '@composify/utils';
import { FC, ReactNode } from 'react';
import { ActiveBlockControl } from '../ActiveBlockControl';
import { EditMode, EditorControl } from '../EditorControl';
import { PropertyLibrary } from '../PropertyLibrary';
import styles from './PanelRight.module.css';

const getClassName = getClassNameFactory('PanelRight', styles);

export type Props = {
  mode: EditMode;
  setMode: (mode: EditMode) => void;
  renderControl?: (getSource: () => string) => ReactNode;
  onSubmit?: (source: string) => void;
};

export const PanelRight: FC<Props> = ({ mode, setMode, renderControl, onSubmit }) => (
  <section className={getClassName()}>
    <EditorControl mode={mode} setMode={setMode} renderControl={renderControl} onSubmit={onSubmit} />
    <ActiveBlockControl />
    <PropertyLibrary />
  </section>
);
