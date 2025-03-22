type SparseNode = {
  id?: never;
  parent?: string;
  type: string;
  props: Record<string, any>;
  children: Node[];
};

type PopulatedNode = Omit<SparseNode, 'id' | 'children'> & {
  id: string;
  children: PopulatedNode[];
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

  public insert = (node: Node, targetId: string, index: number) => {
    const child = 'id' in node ? (node as PopulatedNode) : this.populate(node);
    const parent = this.find(targetId);

    if (!parent) {
      return;
    }

    child.parent = targetId;
    parent.children = [...parent.children.slice(0, index), child, ...parent.children.slice(index)];

    this.notify();
  };

  public remove = (id: string, permanent = true) => {
    const node = this.find(id);

    if (!node || !node.parent) {
      throw new Error(`Node with id ${id} not found`);
    }

    const parent = this.find(node.parent);

    if (!parent) {
      throw new Error('Cannot remove root node');
    }

    parent.children = parent.children.filter(child => child.id !== id);

    if (permanent) {
      this.references.delete(id);
    }

    this.notify();
  };

  public relocate = (sourceId: string, targetId: string, index: number) => {
    const sourceNode = this.find(sourceId);

    if (!sourceNode) {
      return;
    }

    if (this.hasChild(targetId, sourceNode)) {
      return;
    }

    this.remove(sourceId, false);
    this.insert(sourceNode, targetId, index);

    this.notify();
  };

  public stringify = (source?: PopulatedNode): string => {
    const root = source ?? this.root;
    const children = root.children.map(this.stringify);
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
    const id = node.id ?? this.generateRandomId();
    const children = node.children.map(child => this.populate(child, id));

    const populatedNode = {
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

  private hasChild = (id: string, node: PopulatedNode): boolean => {
    const stack = [node];

    while (stack.length) {
      const current = stack.pop();

      if (!current) {
        break;
      }

      if (current.id === id) {
        return true;
      }

      stack.push(...current.children);
    }

    return false;
  };
}
