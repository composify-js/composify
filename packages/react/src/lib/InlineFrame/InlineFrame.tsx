import { FC, PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';

export const InlineFrame: FC<PropsWithChildren> = ({ children, ...props }) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const body = contentRef?.contentWindow?.document?.body;

  return (
    <iframe {...props} ref={setContentRef} style={{ width: '100%', height: '100%', border: 'none' }}>
      {body && createPortal(children, body)}
    </iframe>
  );
};
