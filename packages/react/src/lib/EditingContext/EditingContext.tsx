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
  isAltDown: boolean;
  reorderNode: (leftId: string, rightId: string) => void;
  relocateNode: (originId: string, targetId: string) => void;
  setIsDragging: (value: boolean) => void;
  setIsAltDown: (value: boolean) => void;
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
  isAltDown: false,
  reorderNode: () => null,
  relocateNode: () => null,
  setIsDragging: () => null,
  setIsAltDown: () => null,
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
  const [isAltDown, setIsAltDown] = useState(false);

  const reorderNode = useCallback(
    (leftId: string, rightId: string) => nodeManager.swap(leftId, rightId),
    [nodeManager]
  );

  const relocateNode = useCallback(
    (originId: string, targetId: string) => nodeManager.move(originId, targetId),
    [nodeManager]
  );

  const contextValues = useMemo(
    () => ({
      source,
      isDragging,
      isAltDown,
      reorderNode,
      relocateNode,
      setIsDragging,
      setIsAltDown,
    }),
    [source, isDragging, isAltDown, reorderNode]
  );

  return <EditingContext.Provider value={contextValues}>{children}</EditingContext.Provider>;
};

export const useEditing = () => useContext(EditingContext);
