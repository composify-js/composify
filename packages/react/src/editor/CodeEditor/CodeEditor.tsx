import MonacoEditor, { type OnMount } from '@monaco-editor/react';
import { debounce } from 'es-toolkit';
import type { Plugin } from 'prettier';
import * as meriyahParser from 'prettier/parser-meriyah';
import * as estreePlugin from 'prettier/plugins/estree';
import prettier from 'prettier/standalone';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Catalog, NodeManager, Parser } from '../../renderer';
import { getClassNameFactory } from '../../utils';
import { useEditing } from '../EditingContext';
import styles from './CodeEditor.module.css';

const getClassName = getClassNameFactory('CodeEditor', styles);

const prettify = async (value: string) => {
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
  const disableFormatting = useRef(false);

  const { getSource, replaceRoot } = useEditing();

  const [code, setCode] = useState(getSource());
  const [message, setMessage] = useState('');

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
      const types = new NodeManager(node).collectTypes();
      const missing = Catalog.missing(types);

      if (missing.length === 0) {
        disableFormatting.current = true;
        replaceRoot(node);
        setMessage('');
      } else {
        setMessage(`Unregistered Block${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`);
      }
    } catch {
      // Do nothing if anything fails
      setMessage('Invalid code');
    }
  }, [replaceRoot]);

  const debouncedUpdateSource = useMemo(() => debounce(updateSource, 1000), [updateSource]);

  const handleMount = useCallback<OnMount>(
    (editor) => {
      editorRef.current = editor;
      editorRef.current.onDidBlurEditorText(formatCode);
      editorRef.current.onDidPaste(formatCode);

      formatCode();
    },
    [formatCode],
  );

  const handleChange = useCallback(
    (value?: string) => {
      setMessage('typing...');
      setCode(value ?? '');
      debouncedUpdateSource();
    },
    [debouncedUpdateSource],
  );

  // Update the source when unmount
  useEffect(() => () => updateSource(), [updateSource]);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    if (disableFormatting.current) {
      disableFormatting.current = false;
      return;
    }

    prettify(getSource()).then(setCode);
  }, [getSource]);

  return (
    <section className={getClassName()}>
      <p className={getClassName('Message')}>{message}</p>
      <MonacoEditor
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
