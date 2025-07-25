import { NodeManager, Node } from './NodeManager';

describe('NodeManager', () => {
  let nodeManager: NodeManager;

  const mockSparseNode: Node = {
    type: 'Container',
    props: { width: '100%' },
    children: [
      {
        type: 'Text',
        props: { text: 'Hello' },
        children: [],
      },
      {
        type: 'Button',
        props: { label: 'Click me' },
        children: [],
      },
    ],
  };

  beforeEach(() => {
    nodeManager = new NodeManager(mockSparseNode);
  });

  describe('constructor', () => {
    it('should populate the root node with an id', () => {
      expect(nodeManager.root.id).toBeDefined();
      expect(nodeManager.root.type).toBe('Container');
      expect(nodeManager.root.props).toEqual({ width: '100%' });
    });

    it('should populate all children with ids', () => {
      expect(nodeManager.root.children).toHaveLength(2);
      expect(nodeManager.root.children[0].id).toBeDefined();
      expect(nodeManager.root.children[1].id).toBeDefined();
    });

    it('should set parent references correctly', () => {
      const rootId = nodeManager.root.id;

      expect(nodeManager.root.children[0].parent).toBe(rootId);
      expect(nodeManager.root.children[1].parent).toBe(rootId);
    });
  });

  describe('find', () => {
    it('should find a node by id', () => {
      const firstChild = nodeManager.root.children[0];
      const foundNode = nodeManager.find(firstChild.id);

      expect(foundNode).toBeDefined();
      expect(foundNode?.id).toBe(firstChild.id);
      expect(foundNode?.type).toBe(firstChild.type);
    });

    it('should return undefined for non-existent id', () => {
      const foundNode = nodeManager.find('non-existent-id');

      expect(foundNode).toBeUndefined();
    });

    it('should find the root node', () => {
      const root = nodeManager.root;
      const foundNode = nodeManager.find(root.id);

      expect(foundNode).toBeDefined();
      expect(foundNode?.id).toBe(root.id);
      expect(foundNode?.type).toBe(root.type);
    });
  });

  describe('insert', () => {
    it('should insert a sparse node at the specified index', () => {
      const newNode: Node = {
        type: 'Image',
        props: { src: 'image.jpg' },
        children: [],
      };

      const rootId = nodeManager.root.id;
      const initialChildrenCount = nodeManager.root.children.length;

      nodeManager.insert(newNode, { id: rootId, index: 1 });

      expect(nodeManager.root.children).toHaveLength(initialChildrenCount + 1);
      expect(nodeManager.root.children[1].type).toBe(newNode.type);
      expect(nodeManager.root.children[1].props).toEqual(newNode.props);
      expect(nodeManager.root.children[1].parent).toBe(rootId);
    });

    it('should insert a populated node', () => {
      const existingChild = nodeManager.root.children[0];
      const rootId = nodeManager.root.id;

      nodeManager.remove(existingChild.id);
      nodeManager.insert(existingChild, { id: rootId, index: 0 });

      expect(nodeManager.root.children[0].id).toBe(existingChild.id);
      expect(nodeManager.root.children[0].type).toBe(existingChild.type);
    });

    it('should insert at the beginning when index is 0', () => {
      const newNode: Node = {
        type: 'Header',
        props: { title: 'Header' },
        children: [],
      };

      const rootId = nodeManager.root.id;

      nodeManager.insert(newNode, { id: rootId, index: 0 });

      expect(nodeManager.root.children[0].type).toBe(newNode.type);
    });

    it('should insert at the end when index is greater than children length', () => {
      const newNode: Node = {
        type: 'Footer',
        props: { text: 'Footer' },
        children: [],
      };

      const rootId = nodeManager.root.id;
      const childrenCount = nodeManager.root.children.length;

      nodeManager.insert(newNode, { id: rootId, index: childrenCount + 10 });

      expect(nodeManager.root.children[nodeManager.root.children.length - 1].type).toBe(newNode.type);
    });

    it('should do nothing if target id does not exist', () => {
      const newNode: Node = {
        type: 'Image',
        props: { src: 'image.jpg' },
        children: [],
      };

      const initialChildrenCount = nodeManager.root.children.length;
      nodeManager.insert(newNode, { id: 'non-existent-id', index: 0 });

      expect(nodeManager.root.children).toHaveLength(initialChildrenCount);
    });
  });

  describe('remove', () => {
    it('should remove a node by id', () => {
      const childId = nodeManager.root.children[0].id;
      const initialChildrenCount = nodeManager.root.children.length;

      nodeManager.remove(childId);

      expect(nodeManager.root.children).toHaveLength(initialChildrenCount - 1);
      expect(nodeManager.find(childId)).toBeUndefined();
    });

    it('should throw error when trying to remove non-existent node', () => {
      expect(() => {
        nodeManager.remove('non-existent-id');
      }).toThrow('Node with id non-existent-id not found');
    });

    it('should throw error when trying to remove root node', () => {
      const rootId = nodeManager.root.id;

      expect(() => {
        nodeManager.remove(rootId);
      }).toThrow('Cannot remove root node');
    });

    it('should not permanently delete when permanent is false', () => {
      const childId = nodeManager.root.children[0].id;
      const initialChildrenCount = nodeManager.root.children.length;

      nodeManager.remove(childId, false);

      expect(nodeManager.root.children).toHaveLength(initialChildrenCount - 1);
      expect(nodeManager.find(childId)).toBeDefined();
    });
  });

  describe('relocate', () => {
    it('should move a node to a new parent at specified index', () => {
      const sourceId = nodeManager.root.children[0].id;
      const destinationId = nodeManager.root.children[1].id;

      nodeManager.relocate(sourceId, { id: destinationId, index: 0 });

      const targetNode = nodeManager.find(destinationId);

      expect(targetNode?.children).toHaveLength(1);
      expect(targetNode?.children[0].id).toBe(sourceId);
      expect(nodeManager.root.children).toHaveLength(1);
    });

    it('should do nothing if source node does not exist', () => {
      const destinationId = nodeManager.root.children[0].id;
      const initialRootChildrenCount = nodeManager.root.children.length;

      nodeManager.relocate('non-existent-id', { id: destinationId, index: 0 });

      expect(nodeManager.root.children).toHaveLength(initialRootChildrenCount);
    });

    it('should prevent circular references', () => {
      const parentId = nodeManager.root.id;
      const childId = nodeManager.root.children[0].id;

      nodeManager.relocate(parentId, { id: childId, index: 0 });

      const childNode = nodeManager.find(childId);
      expect(childNode?.children).toHaveLength(0);
    });
  });

  describe('duplicate', () => {
    it('should duplicate a node and insert it after the original', () => {
      const nodeId = nodeManager.root.children[0].id;
      const initialChildrenCount = nodeManager.root.children.length;

      nodeManager.duplicate(nodeId);

      expect(nodeManager.root.children).toHaveLength(initialChildrenCount + 1);

      const originalNode = nodeManager.find(nodeId);

      if (!originalNode) {
        throw new Error('Original node not found');
      }

      const originalNodeIndex = nodeManager.root.children.findIndex(c => c.id === nodeId);
      const duplicatedNode = nodeManager.root.children[originalNodeIndex + 1];

      expect(duplicatedNode).toBeDefined();
      expect(duplicatedNode.id).not.toBe(originalNode.id);
      expect(duplicatedNode.type).toBe(originalNode.type);
      expect(duplicatedNode.props).toEqual(originalNode.props);
    });

    it('should duplicate a node with its children, giving new ids', () => {
      const deepNode: Node = {
        type: 'Container',
        props: {},
        children: [
          {
            type: 'Text',
            props: {},
            children: [],
          },
        ],
      };
      nodeManager.insert(deepNode, { id: nodeManager.root.id, index: 0 });

      const node = nodeManager.root.children[0];
      const originalChildId = node.children[0].id;

      nodeManager.duplicate(node.id);

      const duplicatedNode = nodeManager.root.children[1];

      expect(duplicatedNode.id).not.toBe(node.id);
      expect(duplicatedNode.children).toHaveLength(1);
      expect(duplicatedNode.children[0].id).not.toBe(originalChildId);
      expect(duplicatedNode.children[0].type).toBe('Text');
    });

    it('should throw an error if trying to duplicate the root node', () => {
      const rootId = nodeManager.root.id;

      expect(() => {
        nodeManager.duplicate(rootId);
      }).toThrow('Cannot duplicate root node');
    });

    it('should throw an error if node to duplicate does not exist', () => {
      expect(() => {
        nodeManager.duplicate('non-existent-id');
      }).toThrow('Node with id non-existent-id not found');
    });
  });

  describe('stringify', () => {
    it('should return string representation of the tree', () => {
      const result = nodeManager.stringify();

      expect(result).toContain('Container:');
      expect(result).toContain('Text:');
      expect(result).toContain('Button:');
    });

    it('should handle nodes without children', () => {
      const leafNodeId = nodeManager.root.children[0].id;
      const leafNode = nodeManager.find(leafNodeId);

      if (!leafNode) {
        throw new Error('Leaf node not found');
      }

      const result = nodeManager.stringify(leafNode);
      expect(result).toBe(`Text:${leafNodeId}`);
    });

    it('should handle custom node parameter', () => {
      const childNode = nodeManager.root.children[0];
      const result = nodeManager.stringify(childNode);

      expect(result).toContain(`Text:${childNode.id}`);
    });
  });

  describe('subscribe', () => {
    it('should call subscribers when changes occur', () => {
      const callback = jest.fn();
      const unsubscribe = nodeManager.subscribe(callback);

      const newNode: Node = {
        type: 'Div',
        props: {},
        children: [],
      };

      nodeManager.insert(newNode, { id: nodeManager.root.id, index: 0 });

      expect(callback).toHaveBeenCalled();

      unsubscribe();
    });

    it('should allow unsubscribing', () => {
      const callback = jest.fn();
      const unsubscribe = nodeManager.subscribe(callback);

      unsubscribe();

      const newNode: Node = {
        type: 'Div',
        props: {},
        children: [],
      };

      nodeManager.insert(newNode, { id: nodeManager.root.id, index: 0 });

      expect(callback).not.toHaveBeenCalled();
    });

    it('should handle multiple subscribers', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      nodeManager.subscribe(callback1);
      nodeManager.subscribe(callback2);

      const newNode: Node = {
        type: 'Div',
        props: {},
        children: [],
      };

      nodeManager.insert(newNode, { id: nodeManager.root.id, index: 0 });

      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });
  });

  describe('complex scenarios', () => {
    it('should handle deep nesting', () => {
      const deepNode: Node = {
        type: 'Level1',
        props: {},
        children: [
          {
            type: 'Level2',
            props: {},
            children: [
              {
                type: 'Level3',
                props: {},
                children: [],
              },
            ],
          },
        ],
      };

      nodeManager.insert(deepNode, { id: nodeManager.root.id, index: 0 });

      const level1 = nodeManager.root.children[0];
      const level2 = level1.children[0];
      const level3 = level2.children[0];

      expect(level1.type).toBe('Level1');
      expect(level2.type).toBe('Level2');
      expect(level3.type).toBe('Level3');
      expect(level3.parent).toBe(level2.id);
    });

    it('should maintain consistency during multiple operations', () => {
      const nodeA: Node = { type: 'A', props: {}, children: [] };
      const nodeB: Node = { type: 'B', props: {}, children: [] };

      nodeManager.insert(nodeA, { id: nodeManager.root.id, index: 0 });
      nodeManager.insert(nodeB, { id: nodeManager.root.id, index: 1 });

      const nodeAId = nodeManager.root.children[0].id;
      const nodeBId = nodeManager.root.children[1].id;

      nodeManager.relocate(nodeAId, { id: nodeBId, index: 0 });

      const nodeBAfterMove = nodeManager.find(nodeBId);

      if (!nodeBAfterMove) {
        throw new Error('Node B not found after move');
      }

      expect(nodeBAfterMove.children).toHaveLength(1);
      expect(nodeBAfterMove.children[0].id).toBe(nodeAId);

      nodeManager.remove(nodeBId);

      expect(nodeManager.find(nodeBId)).toBeUndefined();
      expect(nodeManager.find(nodeAId)).toBeUndefined();
    });
  });
});
