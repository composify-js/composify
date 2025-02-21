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

  public swap = (originId: string, targetId: string) => {
    const originNode = this.find(originId);
    const targetNode = this.find(targetId);

    if (!originNode || !targetNode) {
      return this.root;
    }

    this.root = this.swapInternal(originNode, targetNode);
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

  private find = (id: string, source?: PopulatedNode): PopulatedNode | null => {
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

  private swapInternal(from: PopulatedNode, to: PopulatedNode, source?: PopulatedNode): PopulatedNode {
    const node = source ?? this.root;

    if (node.info.id === from.info.id) {
      return to;
    }

    if (node.info.id === to.info.id) {
      return from;
    }

    return {
      ...node,
      children: node.children.map(child => this.swapInternal(from, to, child)),
    };
  }
}
