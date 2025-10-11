import { type ReactNode, useCallback } from 'react';
import type { PropertySpec } from '../../renderer';
import { getClassNameFactory } from '../../utils';
import { useEditing } from '../EditingContext';
import styles from './PropertyControl.module.css';

type Props<SpecValue, Value = SpecValue> = {
  name: string;
  spec: PropertySpec<SpecValue>;
  defaultValue: Value;
  value?: Value;
  compact?: boolean;
  onChange?: (name: string, value?: Value) => void;
  renderInput: (value: Value, onChange: (value?: Value) => void) => ReactNode;
};

const getClassName = getClassNameFactory('PropertyControl', styles);

export const PropertyControl = <SpecValue, Value = SpecValue>({
  name,
  spec,
  defaultValue,
  value,
  compact,
  onChange,
  renderInput,
}: Props<SpecValue, Value>) => {
  const { activeBlock, updateActiveBlock } = useEditing();

  const tentativeValue: Value | undefined = onChange
    ? value
    : name === 'children'
      ? activeBlock?.children[0]
      : activeBlock?.props[name];
  const effectiveValue =
    tentativeValue === undefined ? (spec.optional ? undefined : defaultValue) : tentativeValue;

  const isEffectiveValueDefined = typeof effectiveValue !== 'undefined';

  const effectiveChangeHandler = onChange ?? updateActiveBlock;

  const handleClickOptional = useCallback(() => {
    if (typeof effectiveValue === 'undefined') {
      effectiveChangeHandler(name, defaultValue);
    } else {
      effectiveChangeHandler(name, undefined);
    }
  }, [name, defaultValue, effectiveValue, effectiveChangeHandler]);

  const handleChange = useCallback(
    (value?: Value) => {
      effectiveChangeHandler(name, value);
    },
    [name, effectiveChangeHandler],
  );

  return (
    <div className={getClassName()}>
      {compact ? null : (
        <div className={getClassName('Header')}>
          <span className={getClassName('Label')}>{spec.label}</span>
          {spec.optional && (
            <button
              type="button"
              className={getClassName('OptionalButton')}
              onClick={handleClickOptional}
            >
              {isEffectiveValueDefined ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 640 640"
                >
                  <path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 640 640"
                >
                  <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
                </svg>
              )}
            </button>
          )}
        </div>
      )}
      {isEffectiveValueDefined && renderInput(effectiveValue, handleChange)}
    </div>
  );
};
