import { PropertySpec } from '../PropertySpec';

export type Block<Props = any, Key extends keyof Props = keyof Props> = {
  name: string;
  category?: string;
  component: any;
  props: {
    [key in Key]: PropertySpec<Props[key]>;
  };
};

const blocks = new Map<string, Block>();

export const register = <Props>(name: string, block: Omit<Block<Props>, 'name'>) => {
  for (const spec of Object.values(block.props)) {
    const typedSpec = spec as PropertySpec<any>;

    setSpecDefault(typedSpec);
  }

  blocks.set(name, {
    name,
    ...block,
  });
};

export const valid = (names: string[]): boolean => {
  return names.every(name => blocks.has(name));
};

export const missing = (names: string[]): string[] => {
  return names.filter(name => !blocks.has(name));
};

export const get = (name: string) => {
  if (name.toLowerCase() === name) {
    return {
      component: name,
      props: {} as Record<string, PropertySpec<any>>,
    };
  }

  return blocks.get(name);
};

export const getAll = (query?: string) => {
  const blockList = Array.from(blocks.values())
    .filter(block => block.name.toLowerCase().includes(query?.toLowerCase() ?? ''))
    .sort((a, b) => {
      const aCategory = a.category ?? '~';
      const bCategory = b.category ?? '~';

      return aCategory < bCategory ? -1 : 1;
    })
    .map(block => ({
      ...block,
      category: block.category ?? 'Uncategorized',
    }));

  const blocksByCategory = blockList.reduce(
    (acc, block) => ({
      ...acc,
      [block.category]: [...(acc[block.category] ?? []), block],
    }),
    {} as Record<string, Block<any>[]>
  );

  return Object.entries(blocksByCategory).map(([category, blocks]) => ({
    category,
    blocks,
  }));
};

export const clear = () => {
  blocks.clear();
};

const setSpecDefault = (spec: PropertySpec<any>): void => {
  switch (spec.type) {
    case 'array':
      spec.default ??= [];
      setSpecDefault(spec.item);
      break;
    case 'boolean':
      spec.default ??= false;
      break;
    case 'date':
      spec.default ??= new Date();
      break;
    case 'image':
      spec.default ??= '';
      break;
    case 'node':
      spec.default ??= null;
      break;
    case 'number':
      spec.default ??= 0;
      break;
    case 'object':
      for (const field of Object.values(spec.fields)) {
        setSpecDefault(field);
      }
      spec.default ??= Object.fromEntries(Object.entries(spec.fields).map(([key, field]) => [key, field.default]));
      break;
    case 'custom':
      break;
    case 'radio':
      spec.default ??= 'value' in spec.options[0] ? spec.options[0].value : spec.options[0];
      break;
    case 'select':
      spec.default ??= spec.options[0]?.value;
      break;
    case 'text':
    case 'textarea':
      spec.default ??= '';
      break;
    default:
      throw new Error('Unknown property spec');
  }
};
