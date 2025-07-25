import { NodeManager, Parser, Node } from '@composify/core';
import { createContext, useContext, useMemo, useSyncExternalStore, FC, PropsWithChildren } from 'react';

type SourceContextValues = {
  source: Node;
  insertBlock: (node: Node, destination: { id: string; index: number }) => void;
  relocateBlock: (id: string, destination: { id: string; index: number }) => void;
};

const SourceContext = createContext<SourceContextValues>({
  source: {
    id: '',
    type: 'Fragment',
    props: {},
    children: [],
  },
  insertBlock: () => null,
  relocateBlock: () => null,
});

type Props = {
  source: string;
};

export const SourceProvider: FC<PropsWithChildren<Props>> = ({ source: initialSource, children }) => {
  const nodeManager = useMemo(() => new NodeManager(Parser.parse(initialSource)), [initialSource]);

  const source = useSyncExternalStore(
    nodeManager.subscribe,
    () => nodeManager.root,
    () => nodeManager.root
  );

  const contextValues = useMemo(
    () => ({
      source,
      insertBlock: nodeManager.insert,
      relocateBlock: nodeManager.relocate,
    }),
    [source, nodeManager]
  );

  return <SourceContext.Provider value={contextValues}>{children}</SourceContext.Provider>;
};

export const useSource = () => useContext(SourceContext);
