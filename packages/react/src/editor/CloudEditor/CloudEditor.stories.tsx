import { type FC, type PropsWithChildren, useMemo } from 'react';
import { Catalog } from '../../renderer';
import { CloudEditor } from './CloudEditor';

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
  return <CloudEditor />;
};
