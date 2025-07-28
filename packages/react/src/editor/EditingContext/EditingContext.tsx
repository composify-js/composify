import { Node, NodeManager, Parser } from '@composify/core';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  FC,
  PropsWithChildren,
} from 'react';

type EditingContextValues = {
  source: Node;
  focusedBlock?: Node;
  activeBlock?: Node;
  isDragging: boolean;
  focusBlock: (id?: string) => void;
  selectBlock: (id: string) => void;
  insertBlock: (node: Node, destination: { id: string; index: number }) => void;
  relocateFocusedBlock: (destination: { id: string; index: number }) => void;
  removeActiveBlock: () => void;
  duplicateActiveBlock: () => void;
  updateActiveBlock: (key: string, value: unknown) => void;
};

const EditingContext = createContext<EditingContextValues>({
  source: {
    __composify__: true,
    id: '',
    type: 'Fragment',
    props: {},
    children: [],
  },
  focusedBlock: undefined,
  activeBlock: undefined,
  isDragging: false,
  focusBlock: () => null,
  selectBlock: () => null,
  insertBlock: () => null,
  relocateFocusedBlock: () => null,
  removeActiveBlock: () => null,
  duplicateActiveBlock: () => null,
  updateActiveBlock: () => null,
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

  const [focusedBlockId, setFocusedBlockId] = useState<string>();
  const [activeBlockId, setActiveBlockId] = useState<string>();

  const focusedBlock = useMemo(
    () => (focusedBlockId ? nodeManager.find(focusedBlockId) : undefined),
    [focusedBlockId, nodeManager]
  );

  const activeBlock = useMemo(
    () => (activeBlockId ? nodeManager.find(activeBlockId) : undefined),
    [activeBlockId, nodeManager]
  );

  const isDragging = useMemo(() => typeof focusedBlockId !== 'undefined', [focusedBlockId]);

  const insertBlock = useCallback(
    (node: Node, destination: { id: string; index: number }) => {
      const id = nodeManager.insert(node, destination);

      setActiveBlockId(id);
    },
    [nodeManager]
  );

  const relocateFocusedBlock = useCallback(
    (destination: { id: string; index: number }) => {
      if (focusedBlock) {
        nodeManager.relocate(focusedBlock.id, destination);
      }
    },
    [focusedBlock, nodeManager]
  );

  const removeActiveBlock = useCallback(() => {
    if (activeBlock) {
      nodeManager.remove(activeBlock.id, true);

      setActiveBlockId(undefined);
    }
  }, [activeBlock, nodeManager]);

  const duplicateActiveBlock = useCallback(() => {
    if (activeBlock) {
      const id = nodeManager.duplicate(activeBlock.id);

      setActiveBlockId(id);
    }
  }, [activeBlock, nodeManager]);

  const updateActiveBlock = useCallback(
    (key: string, value: unknown) => {
      if (!activeBlock) {
        throw new Error('No block selected to update');
      }

      nodeManager.update(activeBlock.id, { key, value });
    },
    [activeBlock, nodeManager]
  );

  const contextValues = useMemo(
    () => ({
      source,
      focusedBlock,
      activeBlock,
      isDragging,
      focusBlock: setFocusedBlockId,
      selectBlock: setActiveBlockId,
      insertBlock,
      relocateFocusedBlock,
      removeActiveBlock,
      duplicateActiveBlock,
      updateActiveBlock,
    }),
    [
      source,
      focusedBlock,
      activeBlock,
      isDragging,
      insertBlock,
      relocateFocusedBlock,
      removeActiveBlock,
      duplicateActiveBlock,
      updateActiveBlock,
    ]
  );

  return <EditingContext.Provider value={contextValues}>{children}</EditingContext.Provider>;
};

export const useEditing = () => useContext(EditingContext);
