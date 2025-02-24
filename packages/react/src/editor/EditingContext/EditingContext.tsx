import { NodeManager, Parser, Node } from '@composify/core';
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
  targetId?: string;
  isDragging: boolean;
  relocateNode: (originId: string, targetId: string, index: number) => void;
  insertNode: (origin: Node, targetId: string, index: number) => void;
  setTargetId: (value?: string) => void;
  setIsDragging: (value: boolean) => void;
};

const EditingContext = createContext<EditingContextValues>({
  source: {
    id: '',
    type: 'Fragment',
    props: {},
    children: [],
  },
  targetId: undefined,
  isDragging: false,
  relocateNode: () => null,
  insertNode: () => null,
  setTargetId: () => null,
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
  const [targetId, setTargetId] = useState<string>();

  const relocateNode = useCallback(
    (originId: string, targetId: string, index: number) => nodeManager.move(originId, targetId, index),
    [nodeManager]
  );

  const insertNode = useCallback(
    (origin: Node, targetId: string, index: number) => nodeManager.add(origin, targetId, index),
    [nodeManager]
  );

  const contextValues = useMemo(
    () => ({
      source,
      targetId,
      isDragging,
      relocateNode,
      insertNode,
      setTargetId,
      setIsDragging,
    }),
    [source, isDragging, relocateNode, insertNode]
  );

  return <EditingContext.Provider value={contextValues}>{children}</EditingContext.Provider>;
};

export const useEditing = () => useContext(EditingContext);
