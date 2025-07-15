import { createContext, useContext } from 'react';

type InlineFrameContextProps = {
  document?: Document;
  window?: Window;
};

const defaultValue: InlineFrameContextProps = {
  document: typeof document !== 'undefined' ? document : undefined,
  window: typeof window !== 'undefined' ? window : undefined,
};

const InlineFrameContext = createContext<InlineFrameContextProps>(defaultValue);

export const InlineFrameProvider = InlineFrameContext.Provider;

export const useInlineFrame = () => useContext(InlineFrameContext);
