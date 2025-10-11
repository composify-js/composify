import { createContext, type FC, type PropsWithChildren, useContext, useMemo } from 'react';

type ComposifyEditorContextValues = {
  isLibrary: boolean;
  isVisualEditor: boolean;
};

const ComposifyEditorContext = createContext<ComposifyEditorContextValues>({
  isLibrary: false,
  isVisualEditor: false,
});

export const ComposifyEditorProvider: FC<PropsWithChildren<ComposifyEditorContextValues>> = ({
  isLibrary,
  isVisualEditor,
  children,
}) => {
  const contextValues = useMemo(() => ({ isLibrary, isVisualEditor }), [isLibrary, isVisualEditor]);

  return (
    <ComposifyEditorContext.Provider value={contextValues}>
      {children}
    </ComposifyEditorContext.Provider>
  );
};

export const useComposifyEditor = () => useContext(ComposifyEditorContext);
