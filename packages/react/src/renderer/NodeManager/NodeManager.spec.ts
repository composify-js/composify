import assert from 'assert';
import { NodeManager, type Node, type PopulatedNode } from './NodeManager';

const ensureNode = (node: PopulatedNode | string | undefined): PopulatedNode => {
  if (!node || typeof node === 'string') {
    throw new Error('Expected node');
  }

  return node;
};

const childNodeAt = (parent: PopulatedNode, index: number) => ensureNode(parent.children[index]);

describe('NodeManager', () => {
  const mockSparseNode: Node = {
    __composify__: true,
    type: 'Container',
    props: { width: '100%' },
    children: [
      {
        __composify__: true,
        type: 'Text',
        props: {},
        children: ['Hello'],
      },
      {
        __composify__: true,
        type: 'Button',
        props: { label: 'Click me' },
        children: [],
      },
    ],
  };

  const subject = (node = mockSparseNode) => new NodeManager(node);

  describe('constructor', () => {
    it('should populate the root node with an id', () => {
      const root = subject().root;

      expect(root.id).toBeDefined();
      expect(root.type).toBe(mockSparseNode.type);
      expect(root.props).toEqual(mockSparseNode.props);
    });

    it('should populate node type children with ids', () => {
      const root = subject().root;

      expect(root.children).toHaveLength(2);
      expect(childNodeAt(root, 0).id).toBeDefined();
      expect(childNodeAt(root, 1).id).toBeDefined();
    });

    it('should populate string type children', () => {
      const root = subject().root;

      expect(typeof childNodeAt(root, 0).children[0]).toEqual('string');
    });

    it('should set parent references correctly', () => {
      const root = subject().root;

      expect(childNodeAt(root, 0).parent).toBe(root.id);
      expect(childNodeAt(root, 1).parent).toBe(root.id);
    });
  });

  describe('find', () => {
    it('should find the root node', () => {
      const nodeManager = subject();

      const root = nodeManager.root;
      const foundNode = nodeManager.find(root.id);

      expect(foundNode).toBeDefined();
      expect(foundNode?.id).toBe(root.id);
      expect(foundNode?.type).toBe(root.type);
    });

    it('should find a node by id', () => {
      const nodeManager = subject();

      const firstChild = childNodeAt(nodeManager.root, 0);
      const foundNode = nodeManager.find(firstChild.id);

      expect(foundNode).toBeDefined();
      expect(foundNode?.id).toBe(firstChild.id);
      expect(foundNode?.type).toBe(firstChild.type);
    });

    it('should return undefined for non-existent id', () => {
      const foundNode = subject().find('non-existent-id');

      expect(foundNode).toBeUndefined();
    });
  });

  describe('insert', () => {
    it('should insert a sparse node at the specified index', () => {
      const nodeManager = subject();
      const newNode: Node = {
        __composify__: true,
        type: 'Image',
        props: { src: 'image.jpg' },
        children: [],
      };

      const rootId = nodeManager.root.id;
      const initialChildrenCount = nodeManager.root.children.length;

      nodeManager.insert(newNode, {
        id: rootId,
        index: 1,
      });

      const insertedChild = childNodeAt(nodeManager.root, 1);

      expect(nodeManager.root.children).toHaveLength(initialChildrenCount + 1);
      expect(insertedChild.type).toBe(newNode.type);
      expect(insertedChild.props).toEqual(newNode.props);
      expect(insertedChild.parent).toBe(rootId);
    });

    it('should insert a populated node', () => {
      const nodeManager = subject();

      const existingChild = childNodeAt(nodeManager.root, 0);
      const rootId = nodeManager.root.id;

      nodeManager.remove(existingChild.id);
      nodeManager.insert(existingChild, { id: rootId, index: 0 });

      const insertedChild = childNodeAt(nodeManager.root, 0);

      expect(insertedChild.id).toBe(existingChild.id);
      expect(insertedChild.type).toBe(existingChild.type);
    });

    it('should insert at the beginning when index is 0', () => {
      const nodeManager = subject();
      const newNode: Node = {
        __composify__: true,
        type: 'Header',
        props: { title: 'Header' },
        children: [],
      };

      const rootId = nodeManager.root.id;

      nodeManager.insert(newNode, { id: rootId, index: 0 });

      expect(childNodeAt(nodeManager.root, 0).type).toBe(newNode.type);
    });

    it('should insert at the end when index is greater than children length', () => {
      const nodeManager = subject();
      const newNode: Node = {
        __composify__: true,
        type: 'Footer',
        props: { text: 'Footer' },
        children: [],
      };

      const rootId = nodeManager.root.id;
      const childrenCount = nodeManager.root.children.length;

      nodeManager.insert(newNode, { id: rootId, index: childrenCount + 10 });

      expect(childNodeAt(nodeManager.root, nodeManager.root.children.length - 1).type).toBe(newNode.type);
    });

    it('should do nothing if target id does not exist', () => {
      const nodeManager = subject();
      const newNode: Node = {
        __composify__: true,
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
      const nodeManager = subject();

      const childId = childNodeAt(nodeManager.root, 0).id;
      const initialChildrenCount = nodeManager.root.children.length;

      nodeManager.remove(childId);

      expect(nodeManager.root.children).toHaveLength(initialChildrenCount - 1);
      expect(nodeManager.find(childId)).toBeUndefined();
    });

    it('should throw error when trying to remove non-existent node', () => {
      expect(() => {
        subject().remove('non-existent-id');
      }).toThrow('Node with id non-existent-id not found');
    });

    it('should throw error when trying to remove root node', () => {
      const nodeManager = subject();
      const rootId = nodeManager.root.id;

      expect(() => {
        nodeManager.remove(rootId);
      }).toThrow('Cannot remove root node');
    });

    it('should not permanently delete when permanent is false', () => {
      const nodeManager = subject();

      const childId = childNodeAt(nodeManager.root, 0).id;
      const initialChildrenCount = nodeManager.root.children.length;

      nodeManager.remove(childId, false);

      expect(nodeManager.root.children).toHaveLength(initialChildrenCount - 1);
      expect(nodeManager.find(childId)).toBeDefined();
    });
  });

  describe('relocate', () => {
    it('should move a node to a new parent at specified index', () => {
      const nodeManager = subject();

      const sourceId = childNodeAt(nodeManager.root, 0).id;
      const destinationId = childNodeAt(nodeManager.root, 1).id;

      nodeManager.relocate(sourceId, { id: destinationId, index: 0 });

      const targetNode = nodeManager.find(destinationId);

      assert(targetNode, 'Target node should not be undefined');

      expect(targetNode.children).toHaveLength(1);
      expect(childNodeAt(targetNode, 0).id).toBe(sourceId);
      expect(nodeManager.root.children).toHaveLength(1);
    });

    it('should throw an error if node to relocate does not exist', () => {
      const nodeManager = subject();
      const destinationId = childNodeAt(nodeManager.root, 0).id;

      expect(() => {
        nodeManager.relocate('non-existent-id', { id: destinationId, index: 0 });
      }).toThrow('Node with id non-existent-id not found');
    });

    it('should prevent circular references', () => {
      const nodeManager = subject();

      const parentId = nodeManager.root.id;
      const childId = childNodeAt(nodeManager.root, 0).id;
      const childrenCount = childNodeAt(nodeManager.root, 0).children.length;

      nodeManager.relocate(parentId, { id: childId, index: 0 });

      const childNode = nodeManager.find(childId);
      expect(childNode?.children).toHaveLength(childrenCount);
    });
  });

  describe('duplicate', () => {
    it('should duplicate a node and insert it after the original', () => {
      const nodeManager = subject();

      const nodeId = childNodeAt(nodeManager.root, 0).id;
      const initialChildrenCount = nodeManager.root.children.length;

      nodeManager.duplicate(nodeId);

      expect(nodeManager.root.children).toHaveLength(initialChildrenCount + 1);

      const originalNode = nodeManager.find(nodeId);

      assert(originalNode, 'Target node should not be undefined');

      const originalNodeIndex = nodeManager.root.children.findIndex(c => typeof c !== 'string' && c.id === nodeId);
      const duplicatedNode = childNodeAt(nodeManager.root, originalNodeIndex + 1);

      expect(duplicatedNode).toBeDefined();
      expect(duplicatedNode.id).not.toBe(originalNode.id);
      expect(duplicatedNode.type).toBe(originalNode.type);
      expect(duplicatedNode.props).toEqual(originalNode.props);
    });

    it('should duplicate a node with its children, giving new ids', () => {
      const nodeManager = subject();
      const deepNode: Node = {
        __composify__: true,
        type: 'Container',
        props: {},
        children: [
          {
            __composify__: true,
            type: 'Text',
            props: {},
            children: [],
          },
        ],
      };

      nodeManager.insert(deepNode, { id: nodeManager.root.id, index: 0 });

      const node = childNodeAt(nodeManager.root, 0);
      const originalChildId = childNodeAt(node, 0).id;

      nodeManager.duplicate(node.id);

      const duplicatedNode = childNodeAt(nodeManager.root, 1);
      const duplicatedNodeChild = childNodeAt(duplicatedNode, 0);

      expect(duplicatedNode.id).not.toBe(node.id);
      expect(duplicatedNode.children).toHaveLength(1);
      expect(duplicatedNodeChild.id).not.toBe(originalChildId);
      expect(duplicatedNodeChild.type).toBe('Text');
    });

    it('should throw an error if trying to duplicate the root node', () => {
      const nodeManager = subject();

      expect(() => {
        nodeManager.duplicate(nodeManager.root.id);
      }).toThrow('Cannot duplicate root node');
    });

    it('should throw an error if node to duplicate does not exist', () => {
      const nodeManager = subject();

      expect(() => {
        nodeManager.duplicate('non-existent-id');
      }).toThrow('Node with id non-existent-id not found');
    });
  });

  describe('update', () => {
    it('should update a primitive property on a node', () => {
      const nodeManager = subject();
      const child = childNodeAt(nodeManager.root, 1);

      nodeManager.update(child.id, { key: 'label', value: 'Updated' });

      const updated = nodeManager.find(child.id);

      expect(updated?.props.label).toBe('Updated');
    });

    it('should populate node values and track implicit children', () => {
      const nodeManager = subject();

      const child = childNodeAt(nodeManager.root, 1);
      const iconNode: Node = {
        __composify__: true,
        type: 'Icon',
        props: {},
        children: [],
      };

      nodeManager.update(child.id, { key: 'icon', value: iconNode });

      const implicit = ensureNode(child.implicit.children.icon);

      expect(child.props.icon).toBe(implicit);
      expect(implicit.type).toBe('Icon');
      expect(implicit.parent).toBe(child.id);
    });
  });

  describe('replaceRoot', () => {
    it('should replace the root node and clear old references', () => {
      const nodeManager = subject();

      const oldRootId = nodeManager.root.id;
      const newRoot: Node = {
        __composify__: true,
        type: 'Root',
        props: {},
        children: [],
      };

      nodeManager.replaceRoot(newRoot);

      expect(nodeManager.root.type).toBe('Root');
      expect(nodeManager.find(oldRootId)).toBeUndefined();
      expect(nodeManager.find(nodeManager.root.id)).toBeDefined();
    });
  });

  describe('collectTypes', () => {
    it('should extract single component type', () => {
      const root: Node = {
        __composify__: true,
        type: 'Button',
        props: {},
        children: [],
      };
      const nodeManager = subject(root);

      expect(nodeManager.collectTypes()).toEqual(['Button']);
    });

    it('should extract multiple component types from children', () => {
      const root: Node = {
        __composify__: true,
        type: 'Container',
        props: {},
        children: [
          {
            __composify__: true,
            type: 'Button',
            props: {},
            children: [],
          },
          {
            __composify__: true,
            type: 'Input',
            props: {},
            children: [],
          },
          {
            __composify__: true,
            type: 'Text',
            props: {},
            children: ['content'],
          },
        ],
      };
      const nodeManager = subject(root);

      expect(nodeManager.collectTypes()).toEqual(expect.arrayContaining(['Container', 'Button', 'Input', 'Text']));
      expect(nodeManager.collectTypes()).toHaveLength(4);
    });

    it('should extract component types from nested children', () => {
      const root: Node = {
        __composify__: true,
        type: 'Layout',
        props: {},
        children: [
          {
            __composify__: true,
            type: 'Header',
            props: {},
            children: [
              {
                __composify__: true,
                type: 'Navigation',
                props: {},
                children: [
                  {
                    __composify__: true,
                    type: 'Link',
                    props: {},
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            __composify__: true,
            type: 'Main',
            props: {},
            children: [
              {
                __composify__: true,
                type: 'Article',
                props: {},
                children: [],
              },
            ],
          },
        ],
      };
      const nodeManager = subject(root);
      const types = nodeManager.collectTypes();

      expect(types).toEqual(expect.arrayContaining(['Layout', 'Header', 'Navigation', 'Link', 'Main', 'Article']));
      expect(types).toHaveLength(6);
    });

    it('should extract component types from prop values that are nodes', () => {
      const root: Node = {
        __composify__: true,
        type: 'Modal',
        props: {
          header: {
            __composify__: true,
            type: 'Title',
            props: {},
            children: ['Header'],
          },
          footer: {
            __composify__: true,
            type: 'Button',
            props: {},
            children: ['Close'],
          },
        },
        children: ['Content'],
      };
      const nodeManager = subject(root);
      const types = nodeManager.collectTypes();

      expect(types).toEqual(expect.arrayContaining(['Modal', 'Title', 'Button']));
      expect(types).toHaveLength(3);
    });

    it('should extract component types from complex nested prop values', () => {
      const root: Node = {
        __composify__: true,
        type: 'Form',
        props: {
          header: {
            __composify__: true,
            type: 'Header',
            props: {},
            children: [
              {
                __composify__: true,
                type: 'Title',
                props: {},
                children: [],
              },
            ],
          },
          sidebar: {
            __composify__: true,
            type: 'Sidebar',
            props: {},
            children: [
              {
                __composify__: true,
                type: 'Menu',
                props: {},
                children: [
                  {
                    __composify__: true,
                    type: 'Item',
                    props: {},
                    children: [],
                  },
                ],
              },
            ],
          },
        },
        children: [
          {
            __composify__: true,
            type: 'Field',
            props: {},
            children: [],
          },
        ],
      };
      const nodeManager = subject(root);
      const types = nodeManager.collectTypes();

      expect(types).toEqual(expect.arrayContaining(['Form', 'Header', 'Title', 'Sidebar', 'Menu', 'Item', 'Field']));
      expect(types).toHaveLength(7);
    });

    it('should not duplicate component types', () => {
      const root: Node = {
        __composify__: true,
        type: 'Container',
        props: {},
        children: [
          {
            __composify__: true,
            type: 'Button',
            props: {},
            children: [],
          },
          {
            __composify__: true,
            type: 'Button',
            props: {},
            children: [],
          },
          {
            __composify__: true,
            type: 'Container',
            props: {},
            children: [
              {
                __composify__: true,
                type: 'Button',
                props: {},
                children: [],
              },
            ],
          },
        ],
      };
      const nodeManager = subject(root);
      const types = nodeManager.collectTypes();

      expect(types).toEqual(expect.arrayContaining(['Container', 'Button']));
      expect(types).toHaveLength(2);
    });

    it('should handle Fragment components', () => {
      const root: Node = {
        __composify__: true,
        type: 'Fragment',
        props: {},
        children: [
          {
            __composify__: true,
            type: 'Button',
            props: {},
            children: [],
          },
          {
            __composify__: true,
            type: 'Input',
            props: {},
            children: [],
          },
        ],
      };
      const nodeManager = subject(root);
      const types = nodeManager.collectTypes();

      expect(types).toEqual(expect.arrayContaining(['Fragment', 'Button', 'Input']));
      expect(types).toHaveLength(3);
    });

    it('should handle mixed children and prop nodes', () => {
      const root: Node = {
        __composify__: true,
        type: 'Dialog',
        props: {
          title: {
            __composify__: true,
            type: 'Title',
            props: {},
            children: ['My Dialog'],
          },
          cancelButton: {
            __composify__: true,
            type: 'Button',
            props: {},
            children: ['Cancel'],
          },
          okButton: {
            __composify__: true,
            type: 'Button',
            props: {},
            children: ['OK'],
          },
        },
        children: [
          {
            __composify__: true,
            type: 'Content',
            props: {},
            children: [
              {
                __composify__: true,
                type: 'Text',
                props: {},
                children: ['Dialog content'],
              },
            ],
          },
        ],
      };
      const nodeManager = subject(root);
      const types = nodeManager.collectTypes();

      expect(types).toEqual(expect.arrayContaining(['Dialog', 'Title', 'Button', 'Content', 'Text']));
      expect(types).toHaveLength(5);
    });

    it('should ignore non-node prop values', () => {
      const root: Node = {
        __composify__: true,
        type: 'Component',
        props: {
          stringProp: 'value',
          numberProp: 42,
          booleanProp: true,
          arrayProp: [1, 2, 3],
          objectProp: { key: 'value' },
          nodeProp: {
            __composify__: true,
            type: 'Child',
            props: {},
            children: [],
          },
        },
        children: [],
      };
      const nodeManager = subject(root);
      const types = nodeManager.collectTypes();

      expect(types).toEqual(expect.arrayContaining(['Component', 'Child']));
      expect(types).toHaveLength(2);
    });
  });

  describe('stringify', () => {
    it('should return string representation of the tree', () => {
      const nodeManager = subject();

      const result = nodeManager.stringify();

      expect(result).toContain('Container:');
      expect(result).toContain('Text:');
      expect(result).toContain('Button:');
    });

    it('should handle nodes with children', () => {
      const nodeManager = subject();

      const leafNodeId = childNodeAt(nodeManager.root, 0).id;
      const leafNode = nodeManager.find(leafNodeId);

      if (!leafNode) {
        throw new Error('Leaf node not found');
      }

      const result = nodeManager.stringify(leafNode);
      expect(result).toBe(`[Text:${leafNodeId}, [Hello]]`);
    });

    it('should handle nodes without children', () => {
      const nodeManager = subject();

      const leafNodeId = childNodeAt(nodeManager.root, 1).id;
      const leafNode = nodeManager.find(leafNodeId);

      if (!leafNode) {
        throw new Error('Leaf node not found');
      }

      const result = nodeManager.stringify(leafNode);
      expect(result).toBe(`Button:${leafNodeId}`);
    });

    it('should handle custom node parameter', () => {
      const nodeManager = subject();

      const childNode = childNodeAt(nodeManager.root, 0);
      const result = nodeManager.stringify(childNode);

      expect(result).toContain(`Text:${childNode.id}`);
    });
  });

  describe('subscribe', () => {
    it('should call subscribers when changes occur', () => {
      const nodeManager = subject();

      const callback = jest.fn();
      const unsubscribe = nodeManager.subscribe(callback);

      const newNode: Node = {
        __composify__: true,
        type: 'div',
        props: {},
        children: [],
      };

      nodeManager.insert(newNode, { id: nodeManager.root.id, index: 0 });

      expect(callback).toHaveBeenCalled();

      unsubscribe();
    });

    it('should allow unsubscribing', () => {
      const nodeManager = subject();

      const callback = jest.fn();
      const unsubscribe = nodeManager.subscribe(callback);

      unsubscribe();

      const newNode: Node = {
        __composify__: true,
        type: 'div',
        props: {},
        children: [],
      };

      nodeManager.insert(newNode, { id: nodeManager.root.id, index: 0 });

      expect(callback).not.toHaveBeenCalled();
    });

    it('should handle multiple subscribers', () => {
      const nodeManager = subject();

      const callback1 = jest.fn();
      const callback2 = jest.fn();

      nodeManager.subscribe(callback1);
      nodeManager.subscribe(callback2);

      const newNode: Node = {
        __composify__: true,
        type: 'div',
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
        __composify__: true,
        type: 'Level1',
        props: {},
        children: [
          {
            __composify__: true,
            type: 'Level2',
            props: {},
            children: [
              {
                __composify__: true,
                type: 'Level3',
                props: {},
                children: [],
              },
            ],
          },
        ],
      };
      const nodeManager = subject();

      nodeManager.insert(deepNode, { id: nodeManager.root.id, index: 0 });

      const level1 = childNodeAt(nodeManager.root, 0);
      const level2 = childNodeAt(level1, 0);
      const level3 = childNodeAt(level2, 0);

      expect(level1.type).toBe('Level1');
      expect(level2.type).toBe('Level2');
      expect(level3.type).toBe('Level3');
      expect(level3.parent).toBe(level2.id);
    });

    it('should maintain consistency during multiple operations', () => {
      const nodeManager = subject();

      const nodeA: Node = { __composify__: true, type: 'A', props: {}, children: [] };
      const nodeB: Node = { __composify__: true, type: 'B', props: {}, children: [] };

      nodeManager.insert(nodeA, { id: nodeManager.root.id, index: 0 });
      nodeManager.insert(nodeB, { id: nodeManager.root.id, index: 1 });

      const nodeAId = childNodeAt(nodeManager.root, 0).id;
      const nodeBId = childNodeAt(nodeManager.root, 1).id;

      nodeManager.relocate(nodeAId, { id: nodeBId, index: 0 });

      const nodeBAfterMove = nodeManager.find(nodeBId);

      if (!nodeBAfterMove) {
        throw new Error('Node B not found after move');
      }

      expect(nodeBAfterMove.children).toHaveLength(1);
      expect(childNodeAt(nodeBAfterMove, 0).id).toBe(nodeAId);

      nodeManager.remove(nodeBId);

      expect(nodeManager.find(nodeBId)).toBeUndefined();
      expect(nodeManager.find(nodeAId)).toBeUndefined();
    });
  });
});
