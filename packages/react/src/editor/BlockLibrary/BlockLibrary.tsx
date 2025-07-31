import { Catalog } from '@composify/core';
import { BlockGroup } from '../BlockGroup';

export const BlockLibrary = () =>
  Catalog.getAll().map(({ category, blocks }) => <BlockGroup key={category} category={category} blocks={blocks} />);
