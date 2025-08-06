import { HStack, VStack } from '@composify/react/preset';
import { Catalog, Renderer } from '@composify/react/renderer';

const Text = () => <p>Hello world!</p>;

Catalog.register('Text', {
  component: Text,
  props: {},
});

Catalog.register('HStack', {
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

Catalog.register('VStack', {
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

export default function Page() {
  return <Renderer source={source} />;
}
