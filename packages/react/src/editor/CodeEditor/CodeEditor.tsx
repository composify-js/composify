import { Parser } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import MonacoEditor from '@monaco-editor/react';
import { Plugin } from 'prettier';
import prettier from 'prettier/standalone';
import { useCallback, useEffect, useState } from 'react';
import { useEditing } from '../EditingContext';
import styles from './CodeEditor.module.css';

const getClassName = getClassNameFactory('CodeEditor', styles);

export const CodeEditor = () => {
  const { source } = useEditing();
  const [code, setCode] = useState('');

  const formatCode = useCallback(async () => {
    const stringifiedSource = Parser.stringify(source).trim();

    const formattedCode = await prettier.format(stringifiedSource, {
      parser: 'meriyah',
      plugins: [await import('prettier/parser-meriyah'), (await import('prettier/plugins/estree')) as Plugin],
      printWidth: 120,
      tabWidth: 2,
      semi: false,
    });

    setCode(formattedCode.replace(/^;/, '').replace(/;$/, ''));
  }, [source]);

  useEffect(() => {
    formatCode();
  }, [formatCode]);

  return (
    <section className={getClassName()}>
      <MonacoEditor
        height="100%"
        language="javascript"
        value={code}
        onChange={() => null}
        onMount={() => null}
        options={{
          minimap: {
            enabled: false,
          },
          tabSize: 2,
          fontSize: 14,
          scrollbar: {
            vertical: 'hidden',
          },
          guides: {
            indentation: true,
          },
          automaticLayout: true,
          folding: true,
        }}
      />
    </section>
  );
};
