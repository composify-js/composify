import { Parser } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { FC, ReactNode, useCallback } from 'react';
import { useEditing } from '../EditingContext';
import styles from './EditorControl.module.css';

const getClassName = getClassNameFactory('EditorControl', styles);

type Props = {
  renderControl?: (source: string) => ReactNode;
  onSubmit?: (source: string) => void;
};

export const EditorControl: FC<Props> = ({ renderControl, onSubmit }) => {
  const { source } = useEditing();

  const stringifiedSource = Parser.stringify(source);

  const handleSubmit = useCallback(() => {
    onSubmit?.(stringifiedSource);
  }, [stringifiedSource, onSubmit]);

  return renderControl ? (
    renderControl(stringifiedSource)
  ) : (
    <div className={getClassName()}>
      <button type="button" className={getClassName('SaveButton')} onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};
