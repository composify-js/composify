import { useState } from 'react';
import { Theme } from '../Theme';
import { PropertyControlCustom } from './PropertyControlCustom';

export const BasicUsage = () => {
  const [value, setValue] = useState<string>();

  return (
    <>
      <Theme />
      <PropertyControlCustom
        name="example"
        spec={{
          type: 'custom',
          label: 'Image',
          render: (value, onChange) => (
            <>
              <style>
                {`
              .file-input {
                display: block;
                width: 100%;
                font-size: 0.875rem;
                line-height: 1.4;
                color: var(--docs-color-secondary);
                border: 1px solid var(--docs-color-outline);
                border-radius: 4px;
                cursor: pointer;
                background-color: var(--docs-color-surface-container-low);
                padding: 0;
              }

              .file-input::file-selector-button {
                margin-right: 16px;
                padding: 8px 16px;
                border: 0;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                font-size: 0.875rem;
                line-height: 1.4;
                font-weight: 600;
                background-color: var(--docs-color-secondary);
                color: white;
                cursor: pointer;
                transition: opacity 0.1s;
              }

              .file-input:hover::file-selector-button {
                opacity: 0.9;
              }
              `}
              </style>
              <input
                type="file"
                className="file-input"
                value={value}
                onChange={event => onChange(event.target.files?.[0].name ?? '')}
              />
            </>
          ),
        }}
        value={value}
        onChange={(_, next) => setValue(next)}
      />
    </>
  );
};
