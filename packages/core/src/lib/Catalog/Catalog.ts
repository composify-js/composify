const components = new Map<string, any>();

export const register = (name: string, component: any) => {
  components.set(name, component);
};

export const get = (name: string) => {
  if (name.toLowerCase() === name) {
    return {
      component: name,
    };
  }

  const component = components.get(name);

  if (!component) {
    throw new Error(`Component "${name}" is not registered`);
  }

  return {
    component,
  };
};

export const getAll = () => [...components.values()];

export const clear = () => {
  components.clear();
};
