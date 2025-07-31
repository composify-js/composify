import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import { BlockLibrary } from '../BlockLibrary';
import { Header } from '../Header';
import { SearchForm } from '../SearchForm';
import styles from './PanelLeft.module.css';

type Props = {
  title: string;
};

const getClassName = getClassNameFactory('PanelLeft', styles);

export const PanelLeft: FC<Props> = ({ title }) => (
  <section className={getClassName()}>
    <Header title={title} />
    <SearchForm />
    <BlockLibrary />
  </section>
);
