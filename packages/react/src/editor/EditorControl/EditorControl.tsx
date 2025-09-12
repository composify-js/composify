import { getClassNameFactory } from '@composify/utils';
import { type FC, type ReactNode, useCallback } from 'react';
import { useEditing } from '../EditingContext';
import styles from './EditorControl.module.css';

const getClassName = getClassNameFactory('EditorControl', styles);

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
    [setMode]
  );

  const handleSubmit = useCallback(() => {
    const source = getSource();

    onSubmit?.(source);
  }, [getSource, onSubmit]);

  return (
    <div className={getClassName()}>
      <div className={getClassName('ModeGroup')}>
        <button
          type="button"
          className={getClassName('ModeButton', { active: mode === 'visual' })}
          onClick={() => handleSwitchMode('visual')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 640 640">
            <path d="M512 160L512 416L128 416L128 160L512 160zM128 96C92.7 96 64 124.7 64 160L64 416C64 451.3 92.7 480 128 480L272 480L256 528L184 528C170.7 528 160 538.7 160 552C160 565.3 170.7 576 184 576L456 576C469.3 576 480 565.3 480 552C480 538.7 469.3 528 456 528L384 528L368 480L512 480C547.3 480 576 451.3 576 416L576 160C576 124.7 547.3 96 512 96L128 96z" />
          </svg>
        </button>
        <button
          type="button"
          className={getClassName('ModeButton', { active: mode === 'split' })}
          onClick={() => handleSwitchMode('split')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 640 640">
            <path d="M64 160C64 124.7 92.7 96 128 96L512 96C547.3 96 576 124.7 576 160L576 400L512 400L512 160L128 160L128 400L64 400L64 160zM0 467.2C0 456.6 8.6 448 19.2 448L620.8 448C631.4 448 640 456.6 640 467.2C640 509.6 605.6 544 563.2 544L76.8 544C34.4 544 0 509.6 0 467.2zM281 273L250 304L281 335C290.4 344.4 290.4 359.6 281 368.9C271.6 378.2 256.4 378.3 247.1 368.9L199.1 320.9C189.7 311.5 189.7 296.3 199.1 287L247.1 239C256.5 229.6 271.7 229.6 281 239C290.3 248.4 290.4 263.6 281 272.9zM393 239L441 287C450.4 296.4 450.4 311.6 441 320.9L393 368.9C383.6 378.3 368.4 378.3 359.1 368.9C349.8 359.5 349.7 344.3 359.1 335L390.1 304L359.1 273C349.7 263.6 349.7 248.4 359.1 239.1C368.5 229.8 383.7 229.7 393 239.1z" />
          </svg>
        </button>
        <button
          type="button"
          className={getClassName('ModeButton', { active: mode === 'code' })}
          onClick={() => handleSwitchMode('code')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 640 640">
            <path d="M392.8 65.2C375.8 60.3 358.1 70.2 353.2 87.2L225.2 535.2C220.3 552.2 230.2 569.9 247.2 574.8C264.2 579.7 281.9 569.8 286.8 552.8L414.8 104.8C419.7 87.8 409.8 70.1 392.8 65.2zM457.4 201.3C444.9 213.8 444.9 234.1 457.4 246.6L530.8 320L457.4 393.4C444.9 405.9 444.9 426.2 457.4 438.7C469.9 451.2 490.2 451.2 502.7 438.7L598.7 342.7C611.2 330.2 611.2 309.9 598.7 297.4L502.7 201.4C490.2 188.9 469.9 188.9 457.4 201.4zM182.7 201.3C170.2 188.8 149.9 188.8 137.4 201.3L41.4 297.3C28.9 309.8 28.9 330.1 41.4 342.6L137.4 438.6C149.9 451.1 170.2 451.1 182.7 438.6C195.2 426.1 195.2 405.8 182.7 393.3L109.3 320L182.6 246.6C195.1 234.1 195.1 213.8 182.6 201.3z" />
          </svg>
        </button>
      </div>
      {renderControl ? (
        renderControl(getSource)
      ) : (
        <button type="button" className={getClassName('SaveButton')} onClick={handleSubmit}>
          Save
        </button>
      )}
    </div>
  );
};
