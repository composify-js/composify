import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import { InlineFrame } from '../InlineFrame';
import { InlineFrameBinding } from '../InlineFrameBinding';
import { InlineFrameWindow } from '../InlineFrameWindow';
import { LibraryPanel } from '../LibraryPanel';
import { Preview } from '../Preview';
import { PropertyPanel } from '../PropertyPanel';
import { ViewportManager } from '../ViewportManager';
import styles from './VisualEditor.module.css';

const getClassName = getClassNameFactory('VisualEditor', styles);

export const VisualEditor: FC<unknown> = () => (
  <main className={getClassName()}>
    <LibraryPanel />
    <ViewportManager>
      <InlineFrame>
        <InlineFrameWindow />
        <InlineFrameBinding />
        <Preview />
      </InlineFrame>
    </ViewportManager>
    <PropertyPanel />
  </main>
);
