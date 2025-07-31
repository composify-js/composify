import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import { BlockLibrary } from '../BlockLibrary';
import { SearchForm } from '../SearchForm';
import styles from './PanelLeft.module.css';

const getClassName = getClassNameFactory('PanelLeft', styles);

export const PanelLeft: FC<unknown> = () => (
  <section className={getClassName()}>
    <SearchForm />
    <BlockLibrary />
  </section>
);
