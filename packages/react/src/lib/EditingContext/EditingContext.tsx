import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

type EditingContextValues = {
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
};

const EditingContext = createContext<EditingContextValues>({
  isDragging: false,
  setIsDragging: () => null,
});

export const EditingProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);

  const contextValues = useMemo(
    () => ({
      isDragging,
      setIsDragging,
    }),
    [isDragging]
  );

  return <EditingContext.Provider value={contextValues}>{children}</EditingContext.Provider>;
};

export const useEditing = () => useContext(EditingContext);
