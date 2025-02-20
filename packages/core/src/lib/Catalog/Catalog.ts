import { ComponentSpec } from './Specification';

const catalog = new Map<string, ComponentSpec<any>>();

export const register = <Props>(name: string, spec: ComponentSpec<Props>) => {
  catalog.set(name, spec);
};

export const get = (name: string) => {
  if (name.toLowerCase() === name) {
    return {
      component: name,
    };
  }

  const spec = catalog.get(name);

  if (!spec) {
    throw new Error(`Component "${name}" is not registered`);
  }

  return spec;
};

export const getAll = () => [...catalog.values()];

export const clear = () => {
  catalog.clear();
};
