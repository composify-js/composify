export type NodeInfo = {
  id?: string;
  type: string;
  parent?: {
    id: string;
  };
};

export type PopulatedNodeInfo = Required<Pick<NodeInfo, 'id'>> & Omit<NodeInfo, 'id'>;

export type Node = {
  type: string;
  props: Record<string, any>;
  children: Node[];
  info: NodeInfo;
};

export type PopulatedNode = Omit<Node, 'children' | 'info'> & {
  children: PopulatedNode[];
  info: PopulatedNodeInfo;
};

export class NodeManager {
  public root: PopulatedNode;
  private subscribers = new Set<() => void>();

  constructor(source: Node) {
    this.root = this.populate(source);
  }

  public find = (id: string, source?: PopulatedNode): PopulatedNode | null => {
    const node = source ?? this.root;

    if (node.info.id === id) {
      return node;
    }

    for (const child of node.children) {
      const result = this.find(id, child);

      if (result) {
        return result;
      }
    }

    return null;
  };

  public swap = (leftId: string, rightId: string) => {
    const leftNode = this.find(leftId);
    const rightNode = this.find(rightId);

    if (!leftNode || !rightNode) {
      return this.root;
    }

    this.root = this.swapInternal(leftNode, rightNode);
    this.notify();
  };

  public move = (originId: string, targetId: string, index: number) => {
    const originNode = this.find(originId);

    if (!originNode) {
      return this.root;
    }

    const temp = this.remove(originId);

    if (!temp) {
      throw new Error('Cannot relocate the root node');
    }

    this.root = this.insert(originNode, targetId, index, temp);
    this.notify();
  };

  public stringify = (source?: PopulatedNode): string => {
    const node = source ?? this.root;
    const children = node.children.map(this.stringify);

    if (children.length > 0) {
      return `[${node.info.id}, [${children.join(', ')}]]`;
    }

    return node.info.id ?? '';
  };

  public subscribe = (callback: () => void): (() => void) => {
    this.subscribers.add(callback);

    return () => this.subscribers.delete(callback);
  };

  private notify = () => {
    this.subscribers.forEach(callback => callback());
  };

  private populate = (node: Node, parent?: { id: string }): PopulatedNode => {
    const info = node.info.id
      ? (node.info as PopulatedNodeInfo)
      : {
          id: this.generateRandomId(),
          type: node.type,
          parent,
        };

    const children = node.children.map(child =>
      this.populate(child, {
        id: info.id as string,
      })
    );

    return {
      ...node,
      info,
      children,
    };
  };

  private generateRandomId = () => {
    return Date.now() + Math.random().toString(36).slice(2);
  };

  private remove = (id: string, source?: PopulatedNode): PopulatedNode | null => {
    const node = source ?? this.root;

    if (node.info.id === id) {
      return null;
    }

    return {
      ...node,
      children: node.children.map(child => this.remove(id, child)).filter(Boolean) as PopulatedNode[],
    };
  };

  private insert = (origin: PopulatedNode, targetId: string, index: number, source?: PopulatedNode): PopulatedNode => {
    const node = source ?? this.root;

    if (node.info.id === targetId) {
      return {
        ...node,
        children: [
          ...node.children.slice(0, index),
          {
            ...origin,
            info: {
              ...origin.info,
              parent: {
                id: targetId,
              },
            },
          },
          ...node.children.slice(index),
        ],
      };
    }

    return {
      ...node,
      children: node.children.map(child => this.insert(origin, targetId, index, child)),
    };
  };

  private swapInternal(left: PopulatedNode, right: PopulatedNode, source?: PopulatedNode): PopulatedNode {
    const node = source ?? this.root;

    if (node.info.id === left.info.id) {
      return right;
    }

    if (node.info.id === right.info.id) {
      return left;
    }

    return {
      ...node,
      children: node.children.map(child => this.swapInternal(left, right, child)),
    };
  }
}
