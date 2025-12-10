import type { PropertySpec } from '@composify/react/renderer';
import { IconButton } from '@composify/react/ui';
import { createVariants } from '@composify/react/utils';
import { MinusIcon } from 'lucide-react';
import { type ReactNode, useCallback } from 'react';
import { useEditing } from '../EditingContext';
import styles from './PropertyControl.module.css';

const variants = createVariants(styles);

type Props<SpecValue, Value = SpecValue> = {
  name: string;
  spec: PropertySpec<SpecValue>;
  defaultValue: Value;
  value?: Value;
  orientation?: 'horizontal' | 'vertical';
  compact?: boolean;
  onChange?: (name: string, value?: Value) => void;
  renderInput: (value: Value, onChange: (value?: Value) => void) => ReactNode;
};

export const PropertyControl = <SpecValue, Value = SpecValue>({
  name,
  spec,
  defaultValue,
  value,
  orientation = 'horizontal',
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
  const effectiveValue = tentativeValue === undefined ? (spec.optional ? undefined : defaultValue) : tentativeValue;

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
    <div className={variants('container', { orientation })}>
      <div className={variants('header', { orientation, compact })}>
        <span className={styles.label}>{spec.label}</span>
        {spec.optional && orientation === 'vertical' && isEffectiveValueDefined && (
          <IconButton data-slot="remove-button" size="xs" onClick={handleClickOptional}>
            <MinusIcon />
          </IconButton>
        )}
      </div>
      <div className={styles.input}>
        {isEffectiveValueDefined ? (
          <>
            {renderInput(effectiveValue, handleChange)}
            {spec.optional && orientation === 'horizontal' && (
              <IconButton data-slot="remove-button" size="xs" onClick={handleClickOptional}>
                <MinusIcon />
              </IconButton>
            )}
          </>
        ) : (
          <button type="button" className={styles.button} onClick={handleClickOptional}>
            Add..
          </button>
        )}
      </div>
    </div>
  );
};
