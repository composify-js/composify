/** biome-ignore-all lint/suspicious/noExplicitAny: for arbitrary values */
import type { ComponentType } from 'react';
import { Block, type BlockConfig } from '../Block';

const blocks = new Map<string, Block>();

export const register = <Component extends ComponentType<any>>(name: string, config: BlockConfig<Component>) => {
  const block = new Block(name, config);

  blocks.set(name, block);
};

export const valid = (names: string[]): boolean => {
  return names.every((name) => blocks.has(name));
};

export const missing = (names: string[]): string[] => {
  return names.filter((name) => !blocks.has(name));
};

export const get = (name: string) => {
  if (name.toLowerCase() === name) {
    return new Block(name, {
      component: name,
      props: {},
    });
  }

  return blocks.get(name);
};

export const getAll = (query?: string) => {
  const blockList = Array.from(blocks.values())
    .filter((block) => block.name.toLowerCase().includes(query?.toLowerCase() ?? ''))
    .sort((a, b) => {
      const aCategory = a.category === Block.UNCATEGORIZED ? '~' : a.category;
      const bCategory = b.category === Block.UNCATEGORIZED ? '~' : b.category;

      return aCategory < bCategory ? -1 : 1;
    });

  const blocksByCategory = blockList.reduce(
    (acc, block) => {
      if (Array.isArray(acc[block.category])) {
        acc[block.category].push(block);
      } else {
        acc[block.category] = [block];
      }

      return acc;
    },
    {} as Record<string, Block<any>[]>,
  );

  return Object.entries(blocksByCategory).map(([category, blocks]) => ({
    category,
    blocks,
  }));
};

export const clear = () => {
  blocks.clear();
};
