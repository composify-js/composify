const catalog = new Map<string, any>();

export const register = (name: string, component: any) => {
  catalog.set(name, component);
};

export const get = (name: string) => {
  if (name.toLowerCase() === name) {
    return {
      component: name,
    };
  }

  const component = catalog.get(name);

  if (!component) {
    throw new Error(`Component "${name}" is not registered`);
  }

  return {
    component,
  };
};

export const clear = () => {
  catalog.clear();
};
