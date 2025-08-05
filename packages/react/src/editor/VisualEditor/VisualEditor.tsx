import { FC } from 'react';
import { InlineFrame } from '../InlineFrame';
import { InlineFrameBinding } from '../InlineFrameBinding';
import { InlineFrameWindow } from '../InlineFrameWindow';
import { Preview } from '../Preview';
import { ViewportManager } from '../ViewportManager';

export type Props = {
  viewports?: {
    width: number;
    label: string;
    initial?: boolean;
  }[];
};

export const VisualEditor: FC<Props> = ({ viewports }) => (
  <ViewportManager viewports={viewports}>
    <InlineFrame>
      <InlineFrameWindow />
      <InlineFrameBinding />
      <Preview />
    </InlineFrame>
  </ViewportManager>
);
