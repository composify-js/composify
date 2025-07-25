type DefaultPropertySpec<Value> = {
  label: string;
  list?: boolean;
  default?: Value;
};

export type BooleanPropertySpec = DefaultPropertySpec<boolean> & {
  type: 'boolean';
};

export type DatePropertySpec = DefaultPropertySpec<Date> & {
  type: 'date';
};

export type ImagePropertySpec = DefaultPropertySpec<string> & {
  type: 'image';
};

export type NumberPropertySpec = DefaultPropertySpec<number> & {
  type: 'number';
};

export type NodePropertySpec = DefaultPropertySpec<any> & {
  type: 'node';
};

export type ObjectPropertySpec<Value, Key extends keyof Value> = DefaultPropertySpec<Value> & {
  type: 'object';
  fields: {
    [key in Key]: PropertySpec<Value[key]>;
  };
};

export type RadioPropertySpec = DefaultPropertySpec<any> & {
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

export type SelectPropertySpec = DefaultPropertySpec<any> & {
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

export type TextPropertySpec = DefaultPropertySpec<string> & {
  type: 'text';
};

export type PropertySpec<Value> =
  | (Value extends boolean ? BooleanPropertySpec : never)
  | (Value extends Date ? DatePropertySpec : never)
  | (Value extends string ? TextPropertySpec | ImagePropertySpec : never)
  | (Value extends number ? NumberPropertySpec : never)
  | (Value extends object ? ObjectPropertySpec<Value, keyof Value> : never)
  | RadioPropertySpec
  | SelectPropertySpec
  | NodePropertySpec;
