import { getClassNameFactory } from '@composify/utils';
import {
  useCallback,
  useEffect,
  useState,
  useRef,
  FC,
  IframeHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';
import ReactDOM from 'react-dom';
import * as styles from './InlineFrame.module.css';
import { InlineFrameProvider } from './InlineFrameContext';

type Props = IframeHTMLAttributes<HTMLIFrameElement> &
  PropsWithChildren<{
    head?: ReactNode;
    initialContent?: string;
    mountTarget?: string;
  }>;

const getClassName = getClassNameFactory('InlineFrame', styles);

export const InlineFrame: FC<Props> = ({
  head,
  initialContent = '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>',
  mountTarget = '.frame-root',
  children,
  ...rest
}) => {
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

  const syncStyles = useCallback(() => {
    const doc = getDoc();
    if (!doc) {
      return null;
    }

    doc.head.innerHTML = '';

    const parentStyles = document.head.querySelectorAll('style, link[rel="stylesheet"]');

    parentStyles.forEach(element => {
      const clonedElement = element.cloneNode(true);

      doc.head.appendChild(clonedElement);
    });
  }, [getDoc]);

  useEffect(() => {
    const node = iframeRef.current;
    if (!node) {
      return;
    }

    const handleLoad = () => setIframeLoaded(true);

    node.addEventListener('load', handleLoad);

    return () => {
      node.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (!iframeLoaded) {
      return;
    }

    syncStyles();

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
      className={getClassName()}
      srcDoc={initialContent}
      ref={iframeRef}
      onLoad={() => setIframeLoaded(true)}
    >
      {iframeLoaded && renderFrameContents()}
    </iframe>
  );
};

export default InlineFrame;
