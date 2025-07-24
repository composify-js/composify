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
  selectedNode?: Node;
  draggingNodeId?: string;
  isDragging: boolean;
  relocateNode: (originId: string, targetId: string, index: number) => void;
  insertNode: (origin: Node, targetId: string, index: number) => void;
  removeNode: () => void;
  duplicateNode: () => string;
  updateNode: (key: string, value: unknown) => void;
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
  selectedNode: undefined,
  draggingNodeId: undefined,
  isDragging: false,
  relocateNode: () => null,
  insertNode: () => null,
  removeNode: () => null,
  duplicateNode: () => '',
  updateNode: () => null,
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
    nodeManager.subscribe,
    () => nodeManager.root,
    () => nodeManager.root
  );

  const [selectedNodeId, setSelectedNodeId] = useState<string>();
  const [draggingNodeId, setDraggingNodeId] = useState<string>();
  const [isDragging, setIsDragging] = useState(false);

  const selectedNode = useMemo(
    () => (selectedNodeId ? nodeManager.find(selectedNodeId) : undefined),
    [nodeManager, selectedNodeId]
  );

  const relocateNode = useCallback(
    (originId: string, targetId: string, index: number) => nodeManager.relocate(originId, targetId, index),
    [nodeManager]
  );

  const insertNode = useCallback(
    (origin: Node, targetId: string, index: number) => nodeManager.insert(origin, targetId, index),
    [nodeManager]
  );

  const removeNode = useCallback(() => {
    if (!selectedNodeId) {
      throw new Error('No node selected to remove');
    }

    nodeManager.remove(selectedNodeId, true);
  }, [selectedNodeId, nodeManager]);

  const duplicateNode = useCallback(() => {
    if (!selectedNodeId) {
      throw new Error('No node selected to duplicate');
    }

    return nodeManager.duplicate(selectedNodeId);
  }, [selectedNodeId, nodeManager]);

  const updateNode = useCallback(
    (key: string, value: unknown) => {
      if (!selectedNodeId) {
        throw new Error('No node selected to update');
      }

      nodeManager.update(selectedNodeId, { key, value });
    },
    [nodeManager, selectedNodeId]
  );

  const contextValues = useMemo(
    () => ({
      source,
      selectedNode,
      draggingNodeId,
      isDragging,
      relocateNode,
      insertNode,
      removeNode,
      duplicateNode,
      updateNode,
      setSelectedNodeId,
      setDraggingNodeId,
      setIsDragging,
    }),
    [
      source,
      selectedNode,
      draggingNodeId,
      isDragging,
      relocateNode,
      insertNode,
      removeNode,
      duplicateNode,
      updateNode,
      setSelectedNodeId,
      setDraggingNodeId,
      setIsDragging,
    ]
  );

  return <EditingContext.Provider value={contextValues}>{children}</EditingContext.Provider>;
};

export const useEditing = () => useContext(EditingContext);
