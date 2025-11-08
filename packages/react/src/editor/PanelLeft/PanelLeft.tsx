import type { FC } from 'react';
import { BlockLibrary } from '../BlockLibrary';
import { EditorHeader } from '../EditorHeader';
import { SearchForm } from '../SearchForm';
import styles from './PanelLeft.module.css';

export type Props = {
  title: string;
};

export const PanelLeft: FC<Props> = ({ title }) => (
  <section className={styles.container}>
    <EditorHeader title={title} />
    <SearchForm>{(query) => <BlockLibrary query={query} />}</SearchForm>
  </section>
);
