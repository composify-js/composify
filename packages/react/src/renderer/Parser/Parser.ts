/* eslint-disable @typescript-eslint/no-explicit-any */
import { Parser } from 'acorn';
import jsx from 'acorn-jsx';
import { SparseNode, Node } from '../NodeManager';

const parser = Parser.extend(jsx({ allowNamespaces: false }));

export const parse = (source: string): SparseNode => {
  const parsed = parser.parse(source, {
    ecmaVersion: 2015,
  });

  if (parsed.body.length !== 1) {
    throw new SyntaxError('Expected a single root node, but got: ' + parsed.body.length);
  }

  if (parsed.body[0].type !== 'ExpressionStatement') {
    throw new SyntaxError('Expected an expression statement, but got: ' + parsed.body[0].type);
  }

  return parseNode(parsed.body[0].expression);
};

const parseNode = (node: any): SparseNode => {
  const children = (node.children ?? []).map(parseNode).filter(Boolean);

  switch (node.type) {
    case 'JSXElement':
      return {
        __composify__: true,
        type: node.openingElement.name.name,
        props: node.openingElement.attributes.reduce((properties: Record<string, any>, attribute: any) => {
          const key = attribute.name.name;
          const value = parseAttribute(attribute.value);

          if (value === undefined) {
            return properties;
          }

          return {
            ...properties,
            [key]: value,
          };
        }, {}),
        children,
      };
    case 'JSXFragment':
      return {
        __composify__: true,
        type: 'Fragment',
        props: {},
        children,
      };
    case 'JSXText':
      return node.value.trim();
    default:
      throw new SyntaxError(`${node.type} is not supported`);
  }
};

const parseAttribute = (expression: any): any => {
  if (expression === null) {
    return true;
  }

  switch (expression.type) {
    case 'Literal':
      return expression.value;
    case 'Identifier':
      return expression.name;
    case 'JSXElement':
      return parseNode(expression);
    case 'JSXExpressionContainer':
      return parseAttribute(expression.expression);
    case 'ArrayExpression':
      return expression.elements.map(parseAttribute);
    case 'TemplateLiteral':
      return expression.quasis.reduce((acc: string, quasi: any) => acc + quasi.value.cooked, '');
    case 'ObjectExpression':
      return expression.properties.reduce((properties: Record<string, any>, property: any) => {
        const key = parseAttribute(property.key);
        const value = parseAttribute(property.value);

        if (key === undefined || value === undefined) {
          return properties;
        }

        return {
          ...properties,
          [key]: value,
        };
      }, {});
    case 'BinaryExpression':
      switch (expression.operator) {
        case '+':
          return parseAttribute(expression.left) + parseAttribute(expression.right);
        case '-':
          return parseAttribute(expression.left) - parseAttribute(expression.right);
        case '*':
          return parseAttribute(expression.left) * parseAttribute(expression.right);
        case '**':
          return parseAttribute(expression.left) ** parseAttribute(expression.right);
        case '/':
          return parseAttribute(expression.left) / parseAttribute(expression.right);
        case '%':
          return parseAttribute(expression.left) % parseAttribute(expression.right);
        case '==':
          return parseAttribute(expression.left) == parseAttribute(expression.right);
        case '===':
          return parseAttribute(expression.left) === parseAttribute(expression.right);
        case '!=':
          return parseAttribute(expression.left) != parseAttribute(expression.right);
        case '!==':
          return parseAttribute(expression.left) !== parseAttribute(expression.right);
        case '<':
          return parseAttribute(expression.left) < parseAttribute(expression.right);
        case '<=':
          return parseAttribute(expression.left) <= parseAttribute(expression.right);
        case '>':
          return parseAttribute(expression.left) > parseAttribute(expression.right);
        case '>=':
          return parseAttribute(expression.left) >= parseAttribute(expression.right);
        case '<<':
          return parseAttribute(expression.left) << parseAttribute(expression.right);
        case '>>':
          return parseAttribute(expression.left) >> parseAttribute(expression.right);
        case '>>>':
          return parseAttribute(expression.left) >>> parseAttribute(expression.right);
        case '|':
          return parseAttribute(expression.left) | parseAttribute(expression.right);
        case '&':
          return parseAttribute(expression.left) & parseAttribute(expression.right);
        case '^':
          return parseAttribute(expression.left) ^ parseAttribute(expression.right);
        default:
          throw new SyntaxError(`BinaryExpression with ${expression.operator} is not supported`);
      }
    case 'UnaryExpression':
      switch (expression.operator) {
        case '+':
          return +parseAttribute(expression.argument);
        case '-':
          return -parseAttribute(expression.argument);
        case '~':
          return ~parseAttribute(expression.argument);
        default:
          throw new SyntaxError(`UnaryExpression with "${expression.operator}" is not supported`);
      }
    default:
      throw new SyntaxError(`${expression.type} is not supported`);
  }
};

export const stringify = (node: Node | string): string => {
  if (typeof node === 'string') {
    return node;
  }

  const attributes = stringifyAttributes(node.props);
  const children = node.children.map(child => stringify(child)).join('');

  if (node.type === 'Fragment') {
    return `<>${children}</>`;
  }

  const attrs = attributes ? ` ${attributes}` : '';

  if (children.length > 0) {
    return `<${node.type}${attrs}>${children}</${node.type}>`;
  }

  return `<${node.type}${attrs} />`;
};

const stringifyAttributes = (props: Record<string, unknown>): string => {
  return Object.entries(props)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value}"`;
      }

      return `${key}={${stringifyValue(value)}}`;
    })
    .join(' ');
};

const stringifyValue = (value: unknown): string => {
  if (isNode(value)) {
    return stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map(stringifyValue).join(', ')}]`;
  }

  if (value === null) {
    return 'null';
  }

  switch (typeof value) {
    case 'string':
      return `"${value}"`;
    case 'number':
      return String(value);
    case 'boolean':
      return value ? 'true' : 'false';
    case 'object':
      return `{${Object.entries(value)
        .map(([key, val]) => `${key}: ${stringifyValue(val)}`)
        .join(', ')}}`;
    default:
      return '';
  }
};

const isNode = (value: unknown): value is Node => {
  return !!value && typeof value === 'object' && '__composify__' in value;
};
