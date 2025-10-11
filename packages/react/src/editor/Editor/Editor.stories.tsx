import { type FC, type PropsWithChildren, useMemo } from 'react';
import { Catalog } from '../../renderer';
import { Editor } from './Editor';

type StackProps = PropsWithChildren<{
  flexDirection?: 'row' | 'column';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  gap?: number;
  size?: {
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    height?: number | string;
    minHeight?: number | string;
    maxHeight?: number | string;
  };
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };
  backgroundColor?: string;
}>;

const Stack: FC<StackProps> = ({
  flexDirection,
  alignItems,
  justifyContent,
  gap,
  size,
  padding,
  margin,
  backgroundColor,
  ...props
}) => {
  const style = useMemo(
    () => ({
      display: 'flex',
      flexDirection,
      alignItems,
      justifyContent,
      gap,
      width: size?.width,
      minWidth: size?.minWidth,
      maxWidth: size?.maxWidth,
      height: size?.height,
      minHeight: size?.minHeight,
      maxHeight: size?.maxHeight,
      paddingLeft: padding?.left,
      paddingRight: padding?.right,
      paddingTop: padding?.top,
      paddingBottom: padding?.bottom,
      marginLeft: margin?.left,
      marginRight: margin?.right,
      marginTop: margin?.top,
      marginBottom: margin?.bottom,
      backgroundColor,
    }),
    [flexDirection, alignItems, justifyContent, gap, size, padding, margin, backgroundColor],
  );

  return <div style={style} {...props} />;
};

type TextProps = {
  children: string;
  textAlign: 'left' | 'center' | 'right';
};

const Text: FC<TextProps> = ({ children, textAlign }) => (
  <span style={{ textAlign }}>{children}</span>
);

Catalog.register('Stack', {
  component: Stack,
  props: {
    flexDirection: {
      label: 'Flex Direction',
      type: 'radio',
      options: [
        { label: 'Row', value: 'row' },
        { label: 'Column', value: 'column' },
      ],
      default: 'row',
    },
    justifyContent: {
      label: 'Justify Content',
      type: 'select',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'End', value: 'flex-end' },
        { label: 'Center', value: 'center' },
        { label: 'Space Between', value: 'space-between' },
        { label: 'Space Around', value: 'space-around' },
        { label: 'Space Evenly', value: 'space-evenly' },
      ],
      default: 'flex-start',
      optional: true,
    },
    alignItems: {
      label: 'Align Items',
      type: 'select',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'End', value: 'flex-end' },
        { label: 'Center', value: 'center' },
        { label: 'Stretch', value: 'stretch' },
      ],
      default: 'stretch',
      optional: true,
    },
    gap: {
      label: 'Gap',
      type: 'number',
      default: 0,
      optional: true,
    },
    size: {
      label: 'Size',
      type: 'object',
      fields: {
        width: {
          label: 'Width',
          type: 'number',
          default: 100,
          optional: true,
        },
        minWidth: {
          label: 'Min Width',
          type: 'number',
          default: 0,
          optional: true,
        },
        maxWidth: {
          label: 'Max Width',
          type: 'number',
          default: 1000,
          optional: true,
        },
        height: {
          label: 'Height',
          type: 'number',
          default: 100,
          optional: true,
        },
        minHeight: {
          label: 'Min Height',
          type: 'number',
          default: 0,
          optional: true,
        },
        maxHeight: {
          label: 'Max Height',
          type: 'number',
          default: 1000,
          optional: true,
        },
      },
      optional: true,
    },
    padding: {
      label: 'Padding',
      type: 'object',
      fields: {
        top: {
          label: 'Top',
          type: 'number',
          default: 0,
        },
        right: {
          label: 'Right',
          type: 'number',
          default: 0,
        },
        bottom: {
          label: 'Bottom',
          type: 'number',
          default: 0,
        },
        left: {
          label: 'Left',
          type: 'number',
          default: 0,
        },
      },
      optional: true,
    },
    margin: {
      label: 'Margin',
      type: 'object',
      fields: {
        top: {
          label: 'Top',
          type: 'number',
          default: 0,
        },
        right: {
          label: 'Right',
          type: 'number',
          default: 0,
        },
        bottom: {
          label: 'Bottom',
          type: 'number',
          default: 0,
        },
        left: {
          label: 'Left',
          type: 'number',
          default: 0,
        },
      },
      optional: true,
    },
    backgroundColor: {
      label: 'Background Color',
      type: 'text',
      default: '#ffffff',
      optional: true,
    },
    children: {
      label: 'Children',
      type: 'node',
    },
  },
});

Catalog.register('Text', {
  component: Text,
  props: {
    children: {
      label: 'Content',
      type: 'text',
      default: 'Lorem ipsum',
    },
    textAlign: {
      label: 'Text Align',
      type: 'radio',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      default: 'left',
    },
  },
});

export const BasicUsage = () => {
  const source = `
    <Stack
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="stretch"
      gap={8}
      backgroundColor="#ffffff"
    >
      <Text textAlign="left">Welcome to Composify! 👋</Text>
      <Stack
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="stretch"
        backgroundColor="#f8fafc"
      >
        <Stack
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="stretch"
          size={{ width: 100, height: 100 }}
          backgroundColor="#f1f5f9"
        />
        <Stack
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="stretch"
          size={{ width: 125, height: 100 }}
          backgroundColor="#e2e8f0"
        />
        <Stack
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="stretch"
          size={{ width: 150, height: 100 }}
          backgroundColor="#cbd5e1"
        />
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="stretch"
        size={{ height: 100 }}
        backgroundColor="#f1f5f9"
      />
      <Stack
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="stretch"
        size={{ height: 100 }}
        backgroundColor="#cbd5e1"
      />
    </Stack>
  `;

  return <Editor title="Lorem Ipsum" source={source} onSubmit={console.log} />;
};
