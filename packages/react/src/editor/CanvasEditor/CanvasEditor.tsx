import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import { InlineFrame } from '../InlineFrame';
import { InlineFrameBinding } from '../InlineFrameBinding';
import { InlineFrameWindow } from '../InlineFrameWindow';
import { Library } from '../Library';
import { Preview } from '../Preview';
import { ViewportManager } from '../ViewportManager';
import styles from './CanvasEditor.module.css';

const getClassName = getClassNameFactory('CanvasEditor', styles);

export const CanvasEditor: FC<unknown> = () => (
  <main className={getClassName()}>
    <Library />
    <ViewportManager>
      <InlineFrame>
        <InlineFrameWindow />
        <InlineFrameBinding />
        <Preview />
      </InlineFrame>
    </ViewportManager>
  </main>
);
