type SparseNode = {
  id?: never;
  parent?: string;
  type: string;
  props: Record<string, any>;
  children: (Node | string)[];
};

type PopulatedNode = Omit<SparseNode, 'id' | 'children'> & {
  id: string;
  children: (PopulatedNode | string)[];
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

    if (permanent) {
      node.children.forEach(child => {
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

    node.props[prop.key] = prop.value;

    this.notify();
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

  private populate = (node: Node, parent?: string): PopulatedNode => {
    const id = this.generateRandomId();
    const children = node.children.map(child => (typeof child === 'string' ? child : this.populate(child, id)));

    const populatedNode: PopulatedNode = {
      ...node,
      id,
      parent,
      children,
    };

    this.references.set(id, populatedNode);

    return populatedNode;
  };

  private generateRandomId = () => {
    return Date.now() + Math.random().toString(36).slice(2);
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

      stack.push(...nodeTypeChildren);
    }

    return false;
  };
}
