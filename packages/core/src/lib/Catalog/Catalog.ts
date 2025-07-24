import { PropertySpec } from '../PropertySpec';

export type Block<Props, Key extends keyof Props = keyof Props> = {
  component: any;
  props: {
    [key in Key]: PropertySpec<Props[key]>;
  };
};

const blocks = new Map<string, Block<any>>();

export const register = <Props>(name: string, block: Block<Props>) => {
  blocks.set(name, block);
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

export const getAll = () => [...blocks];

export const clear = () => {
  blocks.clear();
};
