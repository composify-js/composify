import { getClassNameFactory } from '@composify/utils';
// eslint-disable-next-line import/named
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { Plugin } from 'prettier';
import prettier from 'prettier/standalone';
import { useCallback, useRef, useState } from 'react';
import { useEditing } from '../EditingContext';
import styles from './CodeEditor.module.css';

const getClassName = getClassNameFactory('CodeEditor', styles);

const prettify = async (value: string) => {
  const meriyahParser = await import('prettier/parser-meriyah');
  const estreePlugin = await import('prettier/plugins/estree');

  const formattedCode = await prettier.format(value, {
    parser: 'meriyah',
    plugins: [meriyahParser, estreePlugin as Plugin],
    printWidth: 120,
    tabWidth: 2,
    useTabs: false,
    semi: false,
    bracketSpacing: false,
    arrowParens: 'avoid' as const,
    endOfLine: 'lf' as const,
  });

  return formattedCode.replace(/^;/, '').replace(/;$/, '');
};

export const CodeEditor = () => {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const { getSource } = useEditing();
  const [code, setCode] = useState(getSource());

  const handleMount = useCallback<OnMount>(editor => {
    const formatCode = async () => {
      editorRef.current = editor;

      const model = editor.getModel();
      const code = model?.getValue();

      if (!model || !code) {
        return;
      }

      const formattedCode = await prettify(code);
      const selection = editor.getSelection();

      model.pushEditOperations(
        [],
        [
          {
            range: model.getFullModelRange(),
            text: formattedCode,
          },
        ],
        () => (selection ? [selection] : [])
      );
    };

    editor.onDidBlurEditorText(formatCode);
    formatCode();
  }, []);

  const handleChange = useCallback(async (value?: string) => {
    if (!value) {
      return;
    }

    setCode(value);
  }, []);

  return (
    <section className={getClassName()}>
      <MonacoEditor
        height="100%"
        language="javascript"
        value={code}
        onChange={handleChange}
        onMount={handleMount}
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
