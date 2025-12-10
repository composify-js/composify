/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: code highlighting */
import tsx from '@shikijs/langs/tsx';
import typescript from '@shikijs/langs/typescript';
import oneLight from '@shikijs/themes/one-light';
import type { FC } from 'react';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

const CODE_MAP = {
  dropInIntegration: `
import { ButtonCta } from './ButtonCta';

Catalog.register('ButtonCta', {
  component: ButtonCta,
  props: {
    href: {
      label: 'To',
      type: 'text',
      default: '/',
    },
    children: {
      label: 'Text',
      type: 'text',
      default: 'CTA',
    },
  },
});
`.trim(),
  jsxEverywhere: `
<VStack className={['gap-4', 'p-24', 'pt-64', 'bg-surface']}>
  <Heading level={1} size="5xl" weight="extrabold">
    Server Driven UI made easy
  </Heading>
  <Body size="2xl" className={['text-foreground']}>
    Bring visual editing to your components — no rewrites needed.
  </Body>
  <HStack className={['gap-8', 'mt-16']}>
    <ButtonCta variant="primary" size="lg" href="/docs">
      Learn more ›
    </ButtonCta>
    <ButtonCta variant="outline" size="lg" href="/demo">
      View Demo →
    </ButtonCta>
  </HStack>
</VStack>
  `.trim(),
};

const shiki = createHighlighterCoreSync({
  themes: [oneLight],
  langs: [tsx, typescript],
  engine: createJavaScriptRegexEngine(),
});

type Props = {
  language: string;
  content: keyof typeof CODE_MAP;
};

export const CodeSnippet: FC<Props> = ({ language, content }) => {
  const html = shiki.codeToHtml(CODE_MAP[content], {
    lang: language,
    themes: {
      dark: 'one-light',
      light: 'one-light',
    },
  });

  return (
    <div
      className="p-16 [&_*]:!bg-transparent [&_*]:text-[14px] [&_*]:leading-[22px] [&>*]:flex"
      dangerouslySetInnerHTML={{ __html: html }}
      contentEditable={true}
      spellCheck={false}
      autoCorrect="off"
      autoCapitalize="off"
    />
  );
};
