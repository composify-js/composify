import { NodeManager, Parser } from '@composify/core';
import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

type EditingContextValues = {
  source: Parser.Node;
};

const EditingContext = createContext<EditingContextValues>({
  source: {
    type: 'Fragment',
    props: {},
    children: [],
  },
});

type Props = {
  source: string;
};

export const EditingProvider: FC<PropsWithChildren<Props>> = ({ source: initialSource, children }) => {
  const [source] = useState(NodeManager.attachId(Parser.parse(initialSource)));

  const contextValues = useMemo(
    () => ({
      source,
    }),
    [source]
  );

  return <EditingContext.Provider value={contextValues}>{children}</EditingContext.Provider>;
};

export const useEditing = () => useContext(EditingContext);
