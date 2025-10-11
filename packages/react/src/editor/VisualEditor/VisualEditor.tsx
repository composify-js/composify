import type { FC } from 'react';
import { ComposifyEditorProvider } from '../ComposifyEditorContext';
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
      <ComposifyEditorProvider isLibrary={false} isVisualEditor={true}>
        <Preview />
      </ComposifyEditorProvider>
    </InlineFrame>
  </ViewportManager>
);
