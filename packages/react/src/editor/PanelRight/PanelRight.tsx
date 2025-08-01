import { getClassNameFactory } from '@composify/utils';
import { FC, ReactNode } from 'react';
import { ActiveBlockControl } from '../ActiveBlockControl';
import { EditorControl } from '../EditorControl';
import { PropertyLibrary } from '../PropertyLibrary';
import styles from './PanelRight.module.css';

const getClassName = getClassNameFactory('PanelRight', styles);

export type Props = {
  renderControl?: (source: string) => ReactNode;
  onSubmit?: (source: string) => void;
};

export const PanelRight: FC<Props> = ({ renderControl, onSubmit }) => (
  <section className={getClassName()}>
    <EditorControl renderControl={renderControl} onSubmit={onSubmit} />
    <ActiveBlockControl />
    <PropertyLibrary />
  </section>
);
