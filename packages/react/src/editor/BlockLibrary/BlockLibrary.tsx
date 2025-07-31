import { Catalog } from '@composify/core';
import { FC } from 'react';
import { BlockGroup } from '../BlockGroup';

type Props = {
  query: string;
};

export const BlockLibrary: FC<Props> = ({ query }) =>
  Catalog.getAll(query).map(({ category, blocks }) => (
    <BlockGroup key={category} category={category} blocks={blocks} />
  ));
