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
  selectedNodeId?: string;
  draggingNodeId?: string;
  isDragging: boolean;
  relocateNode: (originId: string, targetId: string, index: number) => void;
  insertNode: (origin: Node, targetId: string, index: number) => void;
  setSelectedNodeId: (value?: string) => void;
  setDraggingNodeId: (value?: string) => void;
  setIsDragging: (value: boolean) => void;
};

const EditingContext = createContext<EditingContextValues>({
  source: {
    id: '',
    type: 'Fragment',
    props: {},
    children: [],
  },
  selectedNodeId: undefined,
  draggingNodeId: undefined,
  isDragging: false,
  relocateNode: () => null,
  insertNode: () => null,
  setSelectedNodeId: () => null,
  setDraggingNodeId: () => null,
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

  const [selectedNodeId, setSelectedNodeId] = useState<string>();
  const [draggingNodeId, setDraggingNodeId] = useState<string>();
  const [isDragging, setIsDragging] = useState(false);

  const relocateNode = useCallback(
    (originId: string, targetId: string, index: number) => nodeManager.relocate(originId, targetId, index),
    [nodeManager]
  );

  const insertNode = useCallback(
    (origin: Node, targetId: string, index: number) => nodeManager.insert(origin, targetId, index),
    [nodeManager]
  );

  const contextValues = useMemo(
    () => ({
      source,
      selectedNodeId,
      draggingNodeId,
      isDragging,
      relocateNode,
      insertNode,
      setSelectedNodeId,
      setDraggingNodeId,
      setIsDragging,
    }),
    [
      source,
      selectedNodeId,
      draggingNodeId,
      isDragging,
      relocateNode,
      insertNode,
      setSelectedNodeId,
      setDraggingNodeId,
      setIsDragging,
    ]
  );

  return <EditingContext.Provider value={contextValues}>{children}</EditingContext.Provider>;
};

export const useEditing = () => useContext(EditingContext);
