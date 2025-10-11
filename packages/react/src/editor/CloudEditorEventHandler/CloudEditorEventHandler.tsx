import { type FC, useEffect } from 'react';
import { type Node, Parser } from '../../renderer';
import { Bridge, GuestEventType, HostEventType } from '../../utils';

type Props = {
  setTitle: (title: string) => void;
  replaceRoot: (root: Node) => void;
  getSource: () => string;
};

export const CloudEditorEventHandler: FC<Props> = ({ setTitle, replaceRoot, getSource }) => {
  useEffect(() => {
    const bridge = new Bridge(window.parent);

    bridge.on(HostEventType.Initialize, (data) => {
      setTitle(data.title);
      replaceRoot(Parser.parse(data.content));
    });

    bridge.on(HostEventType.TitleUpdated, (data) => {
      setTitle(data.title);
    });

    bridge.on(HostEventType.ContentRequested, () => {
      bridge.emit({
        type: GuestEventType.ContentProvided,
        content: getSource(),
      });
    });

    return bridge.dispose;
  }, [setTitle, replaceRoot, getSource]);

  return null;
};
