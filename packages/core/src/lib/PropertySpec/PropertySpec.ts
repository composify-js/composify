type DefaultPropertySpec<Value> = {
  label: string;
  default?: Value;
} & (Value extends readonly any[] ? { list: true } : { list?: never });

export type BooleanPropertySpec<Value> = DefaultPropertySpec<Value> & { type: 'boolean' };
export type DatePropertySpec<Value> = DefaultPropertySpec<Value> & { type: 'date' };
export type ImagePropertySpec<Value> = DefaultPropertySpec<Value> & { type: 'image' };
export type NumberPropertySpec<Value> = DefaultPropertySpec<Value> & { type: 'number' };
export type NodePropertySpec<Value> = DefaultPropertySpec<Value> & { type: 'node' };

export type ObjectPropertySpec<
  Value extends Record<string, any>,
  Key extends keyof Value = keyof Value,
> = DefaultPropertySpec<Value> & {
  type: 'object';
  fields: {
    [K in Key]: PropertySpec<Value[K]>;
  };
};

export type RadioPropertySpec<Value> = DefaultPropertySpec<Value> & {
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

export type SelectPropertySpec<Value> = DefaultPropertySpec<Value> & {
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

export type TextPropertySpec<Value> = DefaultPropertySpec<Value> & {
  type: 'text';
};

export type PropertySpec<Value> =
  | (Value extends boolean | boolean[]
      ? BooleanPropertySpec<Value>
      : Value extends Date | Date[]
        ? DatePropertySpec<Value>
        : Value extends number | number[]
          ? NumberPropertySpec<Value>
          : Value extends string | string[]
            ? TextPropertySpec<Value> | ImagePropertySpec<Value>
            : Value extends Record<string, any> | Record<string, any>[]
              ? ObjectPropertySpec<
                  Value extends (infer E)[]
                    ? E extends Record<string, any>
                      ? E
                      : never
                    : Value extends Record<string, any>
                      ? Value
                      : never
                >
              : NodePropertySpec<Value>)
  | RadioPropertySpec<Value>
  | SelectPropertySpec<Value>;
