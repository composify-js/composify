import { Catalog } from '@composify/core';
import { ComponentProps, ReactNode } from 'react';
import { HStack } from '../../preset/HStack';
import { VStack } from '../../preset/VStack';
import { Editor } from './Editor';

const Text = ({
  content,
  suffix,
  textAlign,
}: {
  content: string;
  suffix?: ReactNode;
  textAlign: 'left' | 'center' | 'right';
}) => (
  <div>
    <p style={{ textAlign }}>{content}</p>
    {suffix}
  </div>
);

Catalog.register<ComponentProps<typeof Text>>('Text', {
  component: Text,
  props: {
    content: {
      label: 'Content',
      type: 'text',
      default: 'Lorem ipsum',
    },
    suffix: {
      label: 'Suffix',
      type: 'node',
    },
    textAlign: {
      label: 'Text Align',
      type: 'radio',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
  },
});

Catalog.register<ComponentProps<typeof HStack>>('HStack', {
  component: HStack,
  category: 'Layout',
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
      default: 100,
    },
    backgroundColor: {
      label: 'Background',
      type: 'text',
      default: 'lightgray',
      optional: true,
    },
  },
});

Catalog.register<ComponentProps<typeof VStack>>('VStack', {
  component: VStack,
  category: 'Layout',
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
      default: 100,
    },
    backgroundColor: {
      label: 'Background',
      type: 'text',
      default: 'lightgray',
      optional: true,
    },
  },
});

export const BasicUsage = () => {
  const source = `
    <VStack>
      <HStack backgroundColor="#ECEFF1">
        <HStack width={200} height={100} backgroundColor="#E1F5FE" />
        <Text />
        <HStack width={150} height={100} backgroundColor="#B3E5FC" />
      </HStack>
      <HStack backgroundColor="#CFD8DC">
        <HStack width={100} height={100} backgroundColor="#81D4FA" />
      </HStack>
      <HStack backgroundColor="#B0BEC5" />
    </VStack>
  `;

  return <Editor title="Lorem Ipsum" source={source} onSubmit={console.log} />;
};
