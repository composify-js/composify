import { Parser } from 'acorn';
import jsx from 'acorn-jsx';
import { Node } from '../NodeManager';

const parser = Parser.extend(jsx({ allowNamespaces: false }));

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

const parseNode = (node: any): Node => {
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

export const parse = (source: string): Node => {
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
