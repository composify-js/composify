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
  private subscribers = new Set<() => void>();

  constructor(source: Node) {
    this.root = this.populate(source);
  }

  public find = (id: string, source?: PopulatedNode): PopulatedNode | null => {
    const root = source ?? this.root;

    if (root.id === id) {
      return root;
    }

    for (const child of root.children) {
      const result = this.find(id, child);

      if (result) {
        return result;
      }
    }

    return null;
  };

  public insert = (origin: Node, targetId: string, index: number) => {
    this.root = this.insertInternal(origin, targetId, index);
    this.notify();
  };

  public remove = (id: string) => {
    const temp = this.removeInternal(id);

    if (!temp) {
      throw new Error(`Node with id ${id} not found`);
    }

    this.root = temp;
    this.notify();
  };

  public relocate = (originId: string, targetId: string, index: number) => {
    const originNode = this.find(originId);
    if (!originNode) {
      return this.root;
    }

    const innerTargetNode = this.find(targetId, originNode);
    if (innerTargetNode) {
      return this.root;
    }

    const temp = this.removeInternal(originId);
    if (!temp) {
      throw new Error('Cannot relocate the root node');
    }

    this.root = this.insertInternal(originNode, targetId, index, temp);
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
    this.subscribers.forEach(callback => callback());
  };

  private populate = (node: Node, parent?: string): PopulatedNode => {
    const id = node.id ?? this.generateRandomId();

    const children = node.children.map(child => this.populate(child, id));

    return {
      ...node,
      id,
      parent,
      children,
    };
  };

  private generateRandomId = () => {
    return Date.now() + Math.random().toString(36).slice(2);
  };

  private insertInternal = (origin: Node, targetId: string, index: number, source?: PopulatedNode): PopulatedNode => {
    const root = source ?? this.root;
    const node = 'id' in origin ? (origin as PopulatedNode) : this.populate(origin);

    if (root.id === targetId) {
      return {
        ...root,
        children: [
          ...root.children.slice(0, index),
          {
            ...node,
            parent: targetId,
          },
          ...root.children.slice(index),
        ],
      };
    }

    return {
      ...root,
      children: root.children.map(child => this.insertInternal(node, targetId, index, child)),
    };
  };

  private removeInternal = (id: string, source?: PopulatedNode): PopulatedNode | null => {
    const root = source ?? this.root;

    if (root.id === id) {
      return null;
    }

    return {
      ...root,
      children: root.children.map(child => this.removeInternal(id, child)).filter(Boolean) as PopulatedNode[],
    };
  };
}
