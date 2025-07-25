type DefaultPropertySpec<Value> = {
  label: string;
  default?: Value;
} & (Value extends any[] ? { list: true } : unknown);

export type BooleanPropertySpec<Value extends boolean | boolean[]> = DefaultPropertySpec<Value> & {
  type: 'boolean';
};

export type DatePropertySpec<Value extends Date | Date[]> = DefaultPropertySpec<Value> & {
  type: 'date';
};

export type ImagePropertySpec<Value extends string | string[]> = DefaultPropertySpec<Value> & {
  type: 'image';
};

export type NumberPropertySpec<Value extends number | number[]> = DefaultPropertySpec<Value> & {
  type: 'number';
};

export type NodePropertySpec<Value extends any | any[]> = DefaultPropertySpec<Value> & {
  type: 'node';
};

export type ObjectPropertySpec<
  Value extends any | any[],
  Key extends keyof Value = keyof Value,
> = DefaultPropertySpec<Value> & {
  type: 'object';
  fields: {
    [key in Key]: PropertySpec<Value[key]>;
  };
};

export type RadioPropertySpec<Value extends any | any[]> = DefaultPropertySpec<Value> & {
  type: 'radio';
  options: (
    | {
        label: string;
        value: Value;
      }
    | {
        render: (value: Value) => any;
        value: Value;
      }
  )[];
};

export type SelectPropertySpec<Value extends any | any[]> = DefaultPropertySpec<Value> & {
  type: 'select';
  options: (
    | {
        label: string;
        value: Value;
      }
    | {
        render: (value: Value) => any;
        value: Value;
      }
  )[];
};

export type TextPropertySpec = DefaultPropertySpec<string> & {
  type: 'text';
};

export type PropertySpec<Value> =
  | (Value extends boolean | boolean[] ? BooleanPropertySpec<Value> : never)
  | (Value extends Date | Date[] ? DatePropertySpec<Value> : never)
  | (Value extends string | string[] ? TextPropertySpec | ImagePropertySpec<Value> : never)
  | (Value extends number | number[] ? NumberPropertySpec<Value> : never)
  | (Value extends object | object[] ? ObjectPropertySpec<Value> : never)
  | RadioPropertySpec<Value>
  | SelectPropertySpec<Value>
  | NodePropertySpec<Value>;
