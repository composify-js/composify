import { createContext, type FC, type PropsWithChildren, useContext, useMemo, useState } from 'react';

type SourceContextValues = {
  source: string;
  setSource: (source: string) => void;
};

const SourceContext = createContext<SourceContextValues>({
  source: '',
  setSource: () => null,
});

type Props = {
  source: string;
};

export const SourceProvider: FC<PropsWithChildren<Props>> = ({ source: initialSource, children }) => {
  const [source, setSource] = useState<string>(initialSource);

  const contextValues = useMemo(
    () => ({
      source,
      setSource,
    }),
    [source]
  );

  return <SourceContext.Provider value={contextValues}>{children}</SourceContext.Provider>;
};

export const useSource = () => useContext(SourceContext);
