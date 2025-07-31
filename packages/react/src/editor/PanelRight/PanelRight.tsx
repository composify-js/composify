import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import { ActiveBlockControl } from '../ActiveBlockControl';
import { PropertyLibrary } from '../PropertyLibrary';
import styles from './PanelRight.module.css';

const getClassName = getClassNameFactory('PanelRight', styles);

export const PanelRight: FC<unknown> = () => (
  <section className={getClassName()}>
    <ActiveBlockControl />
    <PropertyLibrary />
  </section>
);
