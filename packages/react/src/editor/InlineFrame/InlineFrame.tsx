import {
  type FC,
  type IframeHTMLAttributes,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './InlineFrame.module.css';
import { InlineFrameProvider } from './InlineFrameContext';

type Props = IframeHTMLAttributes<HTMLIFrameElement> & PropsWithChildren<unknown>;

export const InlineFrame: FC<Props> = ({ children, ...rest }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const getInlineDocument = useCallback(() => iframeRef.current?.contentDocument, []);

  const syncStyles = useCallback(() => {
    const inlineDocument = getInlineDocument();

    if (inlineDocument) {
      inlineDocument.head.innerHTML = document.head.innerHTML;
    }
  }, [getInlineDocument]);

  const renderFrameContents = useCallback(() => {
    const inlineDocument = getInlineDocument();

    if (!inlineDocument) {
      return null;
    }

    const inlineWindow = inlineDocument.defaultView ?? window;

    inlineDocument.head.innerHTML = document.head.innerHTML;

    return createPortal(
      <InlineFrameProvider
        value={{
          document: inlineDocument,
          window: inlineWindow,
        }}
      >
        {children}
      </InlineFrameProvider>,
      inlineDocument.body,
    );
  }, [children, getInlineDocument]);

  useEffect(() => {
    if (!iframeLoaded) {
      return;
    }

    const observer = new MutationObserver(syncStyles);

    observer.observe(document.head, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [iframeLoaded, syncStyles]);

  return (
    <iframe
      {...rest}
      ref={iframeRef}
      srcDoc={`
        <!DOCTYPE html>
        <html data-theme="light">
          <head></head>
          <body></body>
        </html>
      `.trim()}
      className={styles.container}
      onLoad={() => setIframeLoaded(true)}
    >
      {iframeLoaded && renderFrameContents()}
    </iframe>
  );
};

export default InlineFrame;
