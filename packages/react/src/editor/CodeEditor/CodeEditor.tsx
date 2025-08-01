import { Catalog, Parser } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
// eslint-disable-next-line import/named
import MonacoEditor, { useMonaco, OnMount } from '@monaco-editor/react';
import { debounce } from 'es-toolkit';
import { Plugin } from 'prettier';
import prettier from 'prettier/standalone';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEditing } from '../EditingContext';
import styles from './CodeEditor.module.css';

const getClassName = getClassNameFactory('CodeEditor', styles);

const prettify = async (value: string) => {
  const meriyahParser = await import('prettier/parser-meriyah');
  const estreePlugin = await import('prettier/plugins/estree');

  const formattedCode = await prettier
    .format(value, {
      parser: 'meriyah',
      plugins: [meriyahParser, estreePlugin as Plugin],
      printWidth: 120,
      tabWidth: 2,
      useTabs: false,
      semi: false,
      bracketSpacing: false,
      arrowParens: 'avoid' as const,
      endOfLine: 'lf' as const,
    })
    .catch(() => value);

  return formattedCode.replace(/^;/, '').replace(/;$/, '');
};

export const CodeEditor = () => {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const monaco = useMonaco();

  const { getSource, replaceRoot } = useEditing();
  const [code, setCode] = useState(getSource());

  const formatCode = useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    const value = editorRef.current.getValue();

    prettify(value).then(setCode);
  }, []);

  const updateSource = useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    const value = editorRef.current.getValue();

    try {
      const node = Parser.parse(value);
      const types = Parser.extractTypes(node);

      if (Catalog.valid(types)) {
        replaceRoot(node);
      }
    } catch {
      // Do nothing if anything fails
    }
  }, [replaceRoot]);

  const debouncedUpdateSource = useMemo(() => debounce(updateSource, 1000), [updateSource]);

  const handleMount = useCallback<OnMount>(
    editor => {
      if (monaco) {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, formatCode);
      }

      editorRef.current = editor;
      editorRef.current.onDidBlurEditorText(formatCode);
      editorRef.current.onDidPaste(formatCode);

      formatCode();
    },
    [monaco, formatCode]
  );

  const handleChange = useCallback(
    (value?: string) => {
      setCode(value ?? '');
      debouncedUpdateSource();
    },
    [debouncedUpdateSource]
  );

  // Update the source when unmount
  useEffect(() => () => updateSource(), [updateSource]);

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
