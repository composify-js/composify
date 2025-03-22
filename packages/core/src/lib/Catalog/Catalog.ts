import { ComponentSpec } from './Specification';

const specs = new Map<string, ComponentSpec<any>>();

export const register = <Props>(name: string, spec: ComponentSpec<Props>) => {
  specs.set(name, spec);
};

export const get = (name: string) => {
  if (name.toLowerCase() === name) {
    return {
      component: name,
      props: {},
    };
  }

  const spec = specs.get(name);

  if (!spec) {
    throw new Error(`Component "${name}" is not registered`);
  }

  return spec;
};

export const getAll = () => [...specs];

export const clear = () => {
  specs.clear();
};
