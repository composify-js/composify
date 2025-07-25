import { Catalog } from '@composify/core';
import { ComponentProps } from 'react';
import { HStack } from '../../preset/HStack';
import { VStack } from '../../preset/VStack';
import { Editor } from './Editor';

const Text = ({ content }: { content: string }) => <p>{content}</p>;

Catalog.register<ComponentProps<typeof Text>>('Text', {
  component: Text,
  props: {
    content: {
      label: 'Content',
      type: 'text',
      default: 'Hello world!',
    },
  },
});

Catalog.register<ComponentProps<typeof HStack>>('HStack', {
  component: HStack,
  props: {
    children: {
      label: 'Children',
      type: 'boolean',
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
