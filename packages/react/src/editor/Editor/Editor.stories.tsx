import { Catalog } from '@composify/core';
import { ComponentProps } from 'react';
import { HStack } from '../../preset/HStack';
import { VStack } from '../../preset/VStack';
import { Editor } from './Editor';

const Text = ({
  content,
  decorate = { prefix: '', suffix: 0 },
}: {
  content: string;
  decorate: { prefix: string; suffix: number };
}) => (
  <p>
    {decorate.prefix}
    {content}
    {decorate.suffix}
  </p>
);

Catalog.register<ComponentProps<typeof Text>>('Text', {
  component: Text,
  props: {
    content: {
      label: 'Content',
      type: 'textarea',
      default: 'Hello world!',
    },
    decorate: {
      label: 'Decorate',
      type: 'object',
      default: {
        prefix: '',
        suffix: 0,
      },
      fields: {
        prefix: {
          label: 'Prefix',
          type: 'text',
          default: '',
        },
        suffix: {
          label: 'Suffix',
          type: 'number',
          default: 0,
        },
      },
    },
  },
});

Catalog.register<ComponentProps<typeof HStack>>('HStack', {
  component: HStack,
  props: {
    children: {
      label: 'Children',
      type: 'node',
    },
    width: {
      label: 'Width',
      type: 'text',
      default: '100%',
    },
    height: {
      label: 'Height',
      type: 'number',
      default: 96,
    },
    backgroundColor: {
      label: 'Background',
      type: 'text',
      default: 'lightgray',
    },
  },
});

Catalog.register<ComponentProps<typeof VStack>>('VStack', {
  component: VStack,
  props: {
    children: {
      label: 'Children',
      type: 'node',
    },
    width: {
      label: 'Width',
      type: 'text',
      default: '100%',
    },
    height: {
      label: 'Height',
      type: 'number',
      default: 96,
    },
    backgroundColor: {
      label: 'Background',
      type: 'text',
      default: 'lightgray',
    },
  },
});

export const BasicUsage = () => {
  const source = `
    <VStack>
      <HStack backgroundColor="#ECEFF1">
        <HStack width={200} height={100} backgroundColor="#E1F5FE" />
        <Text content="Hello world!" />
        <HStack width={150} height={100} backgroundColor="#B3E5FC" />
      </HStack>
      <HStack backgroundColor="#CFD8DC">
        <HStack width={100} height={100} backgroundColor="#81D4FA" />
      </HStack>
      <HStack backgroundColor="#B0BEC5" />
    </VStack>
  `;

  return <Editor source={source} />;
};
