import { getClassNameFactory } from '@composify/utils';
import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './IsolatedDndProvider.module.css';

const getClassName = getClassNameFactory('IsolatedDndProvider', styles);

export const IsolatedDndProvider: FC<PropsWithChildren> = ({ children }) => {
  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null);

  const backendOptions = useMemo(() => ({ rootElement: wrapper }), [wrapper]);

  return (
    <div ref={setWrapper} className={getClassName()}>
      {wrapper && (
        <DndProvider backend={HTML5Backend} options={backendOptions}>
          {children}
        </DndProvider>
      )}
    </div>
  );
};
