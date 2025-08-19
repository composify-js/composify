/* eslint-disable @typescript-eslint/no-explicit-any */
type DefaultPropertySpec<Value> = {
  label: string;
  default?: Value;
  optional?: boolean;
};

export type BooleanPropertySpec<Value> = DefaultPropertySpec<Value> & { type: 'boolean' };
export type NodePropertySpec<Value> = DefaultPropertySpec<Value> & { type: 'node' };
export type NumberPropertySpec<Value> = DefaultPropertySpec<Value> & { type: 'number' };

export type ArrayPropertySpec<Value extends any[]> = DefaultPropertySpec<Value> & {
  type: 'array';
  item: PropertySpec<Value[number]>;
};

export type CustomPropertySpec<Value> = DefaultPropertySpec<Value> & {
  type: 'custom';
  render: (value: Value, onChange: (value: Value) => void) => any;
};

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
} & (
    | {
        options: {
          label: string;
          value: Value;
        }[];
      }
    | {
        options: Value[];
        render: (value: Value, onChange: (value: Value) => void) => any;
      }
  );

export type SelectPropertySpec<Value> = DefaultPropertySpec<Value> & {
  type: 'select';
  options: {
    label: string;
    value: Value;
  }[];
};

export type TextPropertySpec<Value> = DefaultPropertySpec<Value> & {
  type: 'text';
};

export type TextAreaPropertySpec<Value> = DefaultPropertySpec<Value> & {
  type: 'textarea';
};

export type PropertySpec<Value> =
  | CustomPropertySpec<Value>
  | NodePropertySpec<Value>
  | RadioPropertySpec<Value>
  | SelectPropertySpec<Value>
  | (Value extends unknown[]
      ? ArrayPropertySpec<Value>
      : Value extends boolean
        ? BooleanPropertySpec<Value>
        : Value extends number
          ? NumberPropertySpec<Value>
          : Value extends string
            ? TextPropertySpec<Value> | TextAreaPropertySpec<Value>
            : Value extends Record<string, any>
              ? ObjectPropertySpec<Value>
              : never);
