import { PropertySpec } from '../PropertySpec';

export type Block<Props, Key extends keyof Props = keyof Props> = {
  category?: string;
  component: any;
  props: {
    [key in Key]: PropertySpec<Props[key]>;
  };
};

const blocks = new Map<string, Block<any>>();

export const register = <Props>(name: string, block: Block<Props>) => {
  for (const spec of Object.values(block.props)) {
    const typedSpec = spec as PropertySpec<any>;

    setSpecDefault(typedSpec);
  }

  blocks.set(name, block as Block<any>);
};

export const get = (name: string) => {
  if (name.toLowerCase() === name) {
    return {
      component: name,
      props: {},
    };
  }

  const block = blocks.get(name);

  if (!block) {
    throw new Error(`Block "${name}" is not registered`);
  }

  return block;
};

export const getAll = () =>
  Array.from(blocks.values())
    .sort((a, b) => {
      const aCategory = a.category ?? '~';
      const bCategory = b.category ?? '~';

      return aCategory < bCategory ? -1 : 1;
    })
    .map(block => ({
      ...block,
      category: block.category ?? 'Uncategorized',
    }))
    .reduce(
      (acc, block) => ({
        ...acc,
        [block.category]: [...(acc[block.category] ?? []), block],
      }),
      {} as Record<string, Block<any>[]>
    );

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
