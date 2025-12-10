import { Segment } from '@app/ui-system';
import { CodeXmlIcon, MonitorIcon, SquareSplitHorizontalIcon } from 'lucide-react';
import { type FC, useState } from 'react';

type EditMode = 'visual' | 'code' | 'split';

export const EditorControl: FC<unknown> = () => {
  const [mode, setMode] = useState<EditMode>('visual');

  return (
    <Segment
      options={[
        { label: <MonitorIcon />, value: 'visual' },
        { label: <SquareSplitHorizontalIcon />, value: 'split' },
        { label: <CodeXmlIcon />, value: 'code' },
      ]}
      value={mode}
      onChange={setMode}
      className={['m-auto']}
    />
  );
};
