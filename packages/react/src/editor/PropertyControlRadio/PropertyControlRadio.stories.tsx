import { FC, PropsWithChildren, useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControlRadio } from './PropertyControlRadio';

type TextAlignment = 'left' | 'center' | 'right';

export const BasicUsage = () => {
  const [value, setValue] = useState<TextAlignment | undefined>('left');

  return (
    <>
      <Theme />
      <PropertyControlRadio
        name="example"
        spec={{
          type: 'radio',
          label: 'Alignment',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};

export const WithCustomRender = () => {
  const [value, setValue] = useState<TextAlignment | undefined>('left');

  return (
    <>
      <Theme />
      <PropertyControlRadio
        name="example"
        spec={{
          type: 'radio',
          label: 'Alignment',
          options: ['left', 'center', 'right'],
          render: (value, onChange) => (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <IconButton selected={value === 'left'} onChange={() => onChange('left')}>
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 640 640">
                  <path d="M384 128C384 145.7 369.7 160 352 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L352 96C369.7 96 384 110.3 384 128zM384 384C384 401.7 369.7 416 352 416L128 416C110.3 416 96 401.7 96 384C96 366.3 110.3 352 128 352L352 352C369.7 352 384 366.3 384 384zM96 256C96 238.3 110.3 224 128 224L512 224C529.7 224 544 238.3 544 256C544 273.7 529.7 288 512 288L128 288C110.3 288 96 273.7 96 256zM544 512C544 529.7 529.7 544 512 544L128 544C110.3 544 96 529.7 96 512C96 494.3 110.3 480 128 480L512 480C529.7 480 544 494.3 544 512z" />
                </svg>
              </IconButton>
              <IconButton selected={value === 'center'} onChange={() => onChange('center')}>
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 640 640">
                  <path d="M448 128C448 110.3 433.7 96 416 96L224 96C206.3 96 192 110.3 192 128C192 145.7 206.3 160 224 160L416 160C433.7 160 448 145.7 448 128zM544 256C544 238.3 529.7 224 512 224L128 224C110.3 224 96 238.3 96 256C96 273.7 110.3 288 128 288L512 288C529.7 288 544 273.7 544 256zM96 512C96 529.7 110.3 544 128 544L512 544C529.7 544 544 529.7 544 512C544 494.3 529.7 480 512 480L128 480C110.3 480 96 494.3 96 512zM448 384C448 366.3 433.7 352 416 352L224 352C206.3 352 192 366.3 192 384C192 401.7 206.3 416 224 416L416 416C433.7 416 448 401.7 448 384z" />
                </svg>
              </IconButton>
              <IconButton selected={value === 'right'} onChange={() => onChange('right')}>
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 640 640">
                  <path d="M544 128C544 145.7 529.7 160 512 160L288 160C270.3 160 256 145.7 256 128C256 110.3 270.3 96 288 96L512 96C529.7 96 544 110.3 544 128zM544 384C544 401.7 529.7 416 512 416L288 416C270.3 416 256 401.7 256 384C256 366.3 270.3 352 288 352L512 352C529.7 352 544 366.3 544 384zM96 256C96 238.3 110.3 224 128 224L512 224C529.7 224 544 238.3 544 256C544 273.7 529.7 288 512 288L128 288C110.3 288 96 273.7 96 256zM544 512C544 529.7 529.7 544 512 544L128 544C110.3 544 96 529.7 96 512C96 494.3 110.3 480 128 480L512 480C529.7 480 544 494.3 544 512z" />
                </svg>
              </IconButton>
            </div>
          ),
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};

type IconButtonProps = PropsWithChildren<{
  selected: boolean;
  onChange: () => void;
}>;

const IconButton: FC<IconButtonProps> = ({ selected, children, onChange }) => (
  <button
    style={{
      flex: 1,
      padding: '0.5rem',
      cursor: 'pointer',
      outline: 'none',
      borderRadius: '0.25rem',
      border: `0.0265rem solid ${selected ? 'gainsboro' : 'whitesmoke'}`,
      backgroundColor: selected ? 'gainsboro' : 'whitesmoke',
    }}
    onClick={onChange}
  >
    {children}
  </button>
);
