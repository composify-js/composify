import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';

type WindowContextValues = {
  windows: Window[];
  addWindow: (window: Window) => void;
};

const WindowContext = createContext<WindowContextValues>({
  windows: typeof window !== 'undefined' ? [window] : [],
  addWindow: () => null,
});

export const WindowProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [windows, setWindows] = useState<Window[]>(typeof window !== 'undefined' ? [window] : []);

  const addWindow = useCallback((item: Window) => {
    setWindows(prev => (prev.includes(item) ? prev : [...prev, item]));
  }, []);

  const contextValues = useMemo(() => ({ windows, addWindow }), [windows, addWindow]);

  return <WindowContext.Provider value={contextValues}>{children}</WindowContext.Provider>;
};

export const useWindow = () => useContext(WindowContext);
