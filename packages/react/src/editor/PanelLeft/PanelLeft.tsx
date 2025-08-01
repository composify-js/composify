import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import { BlockLibrary } from '../BlockLibrary';
import { EditorHeader } from '../EditorHeader';
import { SearchForm } from '../SearchForm';
import styles from './PanelLeft.module.css';

export type Props = {
  title: string;
};

const getClassName = getClassNameFactory('PanelLeft', styles);

export const PanelLeft: FC<Props> = ({ title }) => (
  <section className={getClassName()}>
    <EditorHeader title={title} />
    <SearchForm>{query => <BlockLibrary query={query} />}</SearchForm>
  </section>
);
