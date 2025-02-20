type NodePropertySpec = {
  type: 'node';
};

type BooleanPropertySpec = {
  type: 'boolean';
};

type DatePropertySpec = {
  type: 'date';
};

type ImagePropertySpec = {
  type: 'image';
};

type NumberPropertySpec = {
  type: 'number';
};

type ObjectPropertySpec<Value, Key extends keyof Value> = {
  type: 'object';
  fields: {
    [key in Key]: PropertySpec<Value[key]>;
  };
};

type RadioPropertySpec = {
  type: 'radio';
  options: (
    | {
        label: string;
        value: any;
      }
    | {
        render: (value: any) => any;
        value: any;
      }
  )[];
};

type SelectPropertySpec = {
  type: 'select';
  options: (
    | {
        label: string;
        value: any;
      }
    | {
        render: (value: any) => any;
        value: any;
      }
  )[];
};

type TextPropertySpec = {
  type: 'text';
};

export type PropertySpec<Value> = {
  label: string;
  list?: boolean;
  default?: Value;
} & (
  | NodePropertySpec
  | BooleanPropertySpec
  | DatePropertySpec
  | ImagePropertySpec
  | NumberPropertySpec
  | ObjectPropertySpec<Value, keyof Value>
  | RadioPropertySpec
  | SelectPropertySpec
  | TextPropertySpec
);

export type ComponentSpec<Props, Key extends keyof Props = keyof Props> = {
  component: any;
  props?: {
    [key in Key]?: PropertySpec<Props[key]>;
  };
};
