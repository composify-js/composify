import { NodeManager, Node, Parser } from '@composify/core';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';

type EditingContextValues = {
  source: Node;
  isDragging: boolean;
  swapNode: (originId: string, targetId: string) => void;
  setIsDragging: (value: boolean) => void;
};

const EditingContext = createContext<EditingContextValues>({
  source: {
    type: 'Fragment',
    props: {},
    children: [],
    info: {
      type: 'Fragment',
    },
  },
  isDragging: false,
  swapNode: () => null,
  setIsDragging: () => null,
});

type Props = {
  source: string;
};

export const EditingProvider: FC<PropsWithChildren<Props>> = ({ source: initialSource, children }) => {
  const nodeManager = useMemo(() => new NodeManager(Parser.parse(initialSource)), [initialSource]);

  const source = useSyncExternalStore(
    nodeManager.subscribe.bind(nodeManager),
    () => nodeManager.root,
    () => nodeManager.root
  );

  const [isDragging, setIsDragging] = useState(false);

  const swapNode = useCallback(
    (originId: string, targetId: string) => nodeManager.swap(originId, targetId),
    [nodeManager]
  );

  const contextValues = useMemo(
    () => ({
      source,
      isDragging,
      swapNode,
      setIsDragging,
    }),
    [source, isDragging]
  );

  return <EditingContext.Provider value={contextValues}>{children}</EditingContext.Provider>;
};

export const useEditing = () => useContext(EditingContext);
