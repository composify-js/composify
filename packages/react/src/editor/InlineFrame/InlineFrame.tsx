import { useState, useEffect, useRef, IframeHTMLAttributes, PropsWithChildren, FC, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { ClassNames } from '../Constants';
import { InlineFrameProvider } from './InlineFrameContext';

type Props = IframeHTMLAttributes<HTMLIFrameElement> &
  PropsWithChildren<{
    head?: React.ReactNode;
    initialContent?: string;
    mountTarget?: string;
  }>;

const defaultProps = {
  head: null,
  initialContent: '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>',
  mountTarget: '.frame-root',
};

export const InlineFrame: FC<Props> = props => {
  const { head, initialContent, mountTarget, children, ...rest } = {
    ...defaultProps,
    ...props,
  };

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const getDoc = useCallback(() => iframeRef.current?.contentDocument, []);
  const getMountTarget = useCallback(() => getDoc()?.querySelector(mountTarget), [mountTarget, getDoc]);

  const renderFrameContents = useCallback(() => {
    const doc = getDoc();
    if (!doc) {
      return null;
    }

    const win = doc.defaultView ?? window;
    const target = getMountTarget();
    if (!target) {
      return null;
    }

    const contents = (
      <InlineFrameProvider value={{ document: doc, window: win }}>
        <div className="frame-content">{children}</div>
      </InlineFrameProvider>
    );

    return (
      <>
        {ReactDOM.createPortal(head, doc.head)}
        {ReactDOM.createPortal(contents, target)}
      </>
    );
  }, [head, children, getDoc, getMountTarget]);

  useEffect(() => {
    const node = iframeRef.current;
    if (!node) {
      return;
    }

    const handleLoad = () => {
      setIframeLoaded(true);
    };

    node.addEventListener('load', handleLoad);

    return () => {
      node.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <iframe
      {...rest}
      className={ClassNames.Viewport}
      srcDoc={initialContent}
      ref={iframeRef}
      onLoad={() => setIframeLoaded(true)}
    >
      {iframeLoaded && renderFrameContents()}
    </iframe>
  );
};

export default InlineFrame;
