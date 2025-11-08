import { CodeXmlIcon, MonitorIcon, SquareSplitHorizontalIcon } from 'lucide-react';
import { type FC, type ReactNode, useCallback } from 'react';
import { Button, Segment } from '../../preset';
import { useEditing } from '../EditingContext';
import styles from './EditorControl.module.css';

export type EditMode = 'visual' | 'code' | 'split';

type Props = {
  mode: EditMode;
  setMode: (mode: EditMode) => void;
  renderControl?: (getSource: () => string) => ReactNode;
  onSubmit?: (source: string) => void;
};

export const EditorControl: FC<Props> = ({ mode, setMode, renderControl, onSubmit }) => {
  const { getSource } = useEditing();

  const handleSwitchMode = useCallback(
    (value: EditMode) => {
      setMode(value);
    },
    [setMode],
  );

  const handleSubmit = useCallback(() => {
    const source = getSource();

    onSubmit?.(source);
  }, [getSource, onSubmit]);

  return (
    <div className={styles.container}>
      <Segment
        size="sm"
        options={[
          { label: <MonitorIcon />, value: 'visual' },
          { label: <SquareSplitHorizontalIcon />, value: 'split' },
          { label: <CodeXmlIcon />, value: 'code' },
        ]}
        value={mode}
        onChange={handleSwitchMode}
      />
      {renderControl ? (
        renderControl(getSource)
      ) : (
        <Button type="button" variant="primary" size="sm" onClick={handleSubmit}>
          Save
        </Button>
      )}
    </div>
  );
};
