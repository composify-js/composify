import { Catalog } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { LibraryBlockGroup } from '../LibraryBlocksGroup';
import { SearchForm } from '../SearchForm';
import styles from './LibraryPanel.module.css';

const getClassName = getClassNameFactory('LibraryPanel', styles);

export const LibraryPanel = () => (
  <section className={getClassName()}>
    <SearchForm />
    {Catalog.getAll().map(({ category, blocks }) => (
      <LibraryBlockGroup key={category} category={category} blocks={blocks} />
    ))}
  </section>
);
