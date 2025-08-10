import { type FC } from 'react';
import { Catalog } from '../../renderer';
import { BlockGroup } from '../BlockGroup';
import { ComposifyEditorProvider } from '../ComposifyEditorContext';

type Props = {
  query: string;
};

export const BlockLibrary: FC<Props> = ({ query }) => (
  <ComposifyEditorProvider isLibrary={true} isVisualEditor={false}>
    {Catalog.getAll(query).map(({ category, blocks }) => (
      <BlockGroup key={category} category={category} blocks={blocks} />
    ))}
  </ComposifyEditorProvider>
);
