/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type SparseNode = {
  __composify__: true;
  id?: never;
  parent?: string;
  type: string;
  props: Record<string, any>;
  children: (Node | string)[];
};

export type PopulatedNode = Omit<SparseNode, 'id' | 'children'> & {
  id: string;
  children: (PopulatedNode | string)[];
  implicit: {
    parentPropKey?: string;
    children: Record<string, PopulatedNode | string>;
  };
};

export type Node = SparseNode | PopulatedNode;

export class NodeManager {
  public root: PopulatedNode;

  private references = new Map<string, PopulatedNode>();
  private subscribers = new Set<() => void>();

  constructor(source: Node) {
    this.root = this.populate(source);
  }

  public find = (id: string): PopulatedNode | undefined => {
    return this.references.get(id);
  };

  public insert = (node: Node, destination: { id: string; index: number }) => {
    const child = 'id' in node ? (node as PopulatedNode) : this.populate(node);
    const parent = this.find(destination.id);

    if (!parent) {
      return;
    }

    child.parent = parent.id;
    parent.children = [
      ...parent.children.slice(0, destination.index),
      child,
      ...parent.children.slice(destination.index),
    ];

    this.notify();

    return child.id;
  };

  public remove = (id: string, permanent = true) => {
    const node = this.find(id);

    if (!node) {
      throw new Error(`Node with id ${id} not found`);
    }

    if (!node.parent) {
      throw new Error('Cannot remove root node');
    }

    const parent = this.find(node.parent);

    if (!parent) {
      throw new Error('Parent node not found');
    }

    parent.children = parent.children.filter(child => typeof child === 'string' || child.id !== id);

    if (node.implicit.parentPropKey) {
      parent.props[node.implicit.parentPropKey] = null;
      delete parent.implicit.children[node.implicit.parentPropKey];
      delete node.implicit.parentPropKey;
    }

    if (permanent) {
      node.children.forEach(child => {
        if (typeof child === 'string') {
          return;
        }

        this.remove(child.id, true);
      });

      Object.values(node.implicit.children).forEach(child => {
        if (typeof child === 'string') {
          return;
        }

        this.remove(child.id, true);
      });

      this.references.delete(id);
    }

    this.notify();
  };

  public relocate = (id: string, destination: { id: string; index: number }) => {
    const node = this.find(id);

    if (!node) {
      throw new Error(`Node with id ${id} not found`);
    }

    if (this.hasChild(node, destination.id)) {
      return;
    }

    this.remove(id, false);
    this.insert(node, destination);

    this.notify();
  };

  public duplicate = (id: string) => {
    const node = this.find(id);

    if (!node) {
      throw new Error(`Node with id ${id} not found`);
    }

    if (!node.parent) {
      throw new Error('Cannot duplicate root node');
    }

    if (node.implicit.parentPropKey) {
      throw new Error('Cannot duplicate implicit node');
    }

    const parent = this.find(node.parent);

    if (!parent) {
      throw new Error('Parent node not found');
    }

    const index = parent.children.findIndex(child => typeof child !== 'string' && child.id === id);
    const duplicated = this.populate(node);

    this.insert(duplicated, {
      id: parent.id,
      index: index + 1,
    });

    this.notify();

    return duplicated.id;
  };

  public update = <Value>(id: string, prop: { key: string; value: Value }) => {
    const node = this.find(id);

    if (!node) {
      throw new Error(`Node with id ${id} not found`);
    }

    if (this.isNode(prop.value)) {
      const populatedValue = this.populate(prop.value, {
        parent: id,
        implicit: prop.key,
      });

      node.implicit.children[prop.key] = populatedValue;
      node.props[prop.key] = populatedValue;
    } else if (typeof prop.value === 'undefined') {
      delete node.props[prop.key];
      delete node.implicit.children[prop.key];
    } else {
      node.props[prop.key] = prop.value;
    }

    this.notify();
  };

  public replaceRoot = (source: Node) => {
    this.references.clear();
    this.root = this.populate(source);
    this.notify();
  };

  public collectTypes = (target?: Node | string): string[] => {
    const node = target ?? this.root;

    if (typeof node === 'string') {
      return [];
    }

    const types = new Set<string>();

    types.add(node.type);

    node.children.forEach(child => {
      this.collectTypes(child).forEach(type => types.add(type));
    });

    Object.values(node.props).forEach(value => {
      if (this.isNode(value)) {
        this.collectTypes(value).forEach(type => types.add(type));
      }
    });

    return Array.from(types);
  };

  public stringify = (source?: PopulatedNode): string => {
    const root = source ?? this.root;
    const children = root.children.map(child => (typeof child === 'string' ? child : this.stringify(child)));
    const name = `${root.type}:${root.id}`;

    if (children.length > 0) {
      return `[${name}, [${children.join(', ')}]]`;
    }

    return name;
  };

  public subscribe = (callback: () => void): (() => void) => {
    this.subscribers.add(callback);

    return () => this.subscribers.delete(callback);
  };

  private notify = () => {
    this.root = { ...this.root };
    this.references.set(this.root.id, this.root);
    this.subscribers.forEach(callback => callback());
  };

  private populate = (node: Node, options?: { parent: string; implicit?: string }): PopulatedNode => {
    const id = this.generateRandomId();
    const implicit: PopulatedNode['implicit'] = {
      ...(options?.implicit ? { parentPropKey: options.implicit } : {}),
      children: {},
    };

    const props = Object.fromEntries(
      Object.entries(node.props).map(([key, value]) => {
        if (this.isNode(value)) {
          const populatedValue = this.populate(value, {
            parent: id,
            implicit: key,
          });

          implicit.children[key] = populatedValue;

          return [key, populatedValue];
        }

        return [key, value];
      })
    );

    const children = node.children.map(child =>
      typeof child === 'string' ? child : this.populate(child, { parent: id })
    );

    const populatedNode: PopulatedNode = {
      ...node,
      id,
      props,
      parent: options?.parent,
      children,
      implicit,
    };

    this.references.set(id, populatedNode);

    return populatedNode;
  };

  private generateRandomId = () => {
    return Date.now() + Math.random().toString(36).slice(2);
  };

  private isNode = (value: any): value is Node => {
    return value && typeof value === 'object' && '__composify__' in value;
  };

  private hasChild = (parent: PopulatedNode, id: string): boolean => {
    const stack = [parent];

    while (stack.length) {
      const current = stack.pop();

      if (!current) {
        break;
      }

      if (current.id === id) {
        return true;
      }

      const nodeTypeChildren = current.children.filter(child => typeof child !== 'string');
      const nodeTypeImplicitChildren = Object.values(current.implicit.children).filter(
        child => typeof child !== 'string'
      );

      stack.push(...nodeTypeChildren, ...nodeTypeImplicitChildren);
    }

    return false;
  };
}
