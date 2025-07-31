import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import { InlineFrame } from '../InlineFrame';
import { InlineFrameBinding } from '../InlineFrameBinding';
import { InlineFrameWindow } from '../InlineFrameWindow';
import { PanelLeft } from '../PanelLeft';
import { PanelRight } from '../PanelRight';
import { Preview } from '../Preview';
import { ViewportManager } from '../ViewportManager';
import styles from './VisualEditor.module.css';

type Props = {
  title: string;
  viewports: {
    width: number;
    label: string;
  }[];
};

const getClassName = getClassNameFactory('VisualEditor', styles);

export const VisualEditor: FC<Props> = ({ title, viewports }) => (
  <main className={getClassName()}>
    <PanelLeft title={title} />
    <ViewportManager viewports={viewports}>
      <InlineFrame>
        <InlineFrameWindow />
        <InlineFrameBinding />
        <Preview />
      </InlineFrame>
    </ViewportManager>
    <PanelRight />
  </main>
);
