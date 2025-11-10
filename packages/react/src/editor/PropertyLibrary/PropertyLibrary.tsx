import { Catalog } from '@composify/react/renderer';
import type { FC } from 'react';
import { useEditing } from '../EditingContext';
import { PropertyGroup } from '../PropertyGroup';

export const PropertyLibrary: FC<unknown> = () => {
  const { activeBlock } = useEditing();

  if (!activeBlock) {
    return null;
  }

  const block = Catalog.get(activeBlock.type);

  if (!block) {
    return null;
  }

  return Object.entries(block.getGroupedProps()).map(([group, props]) => (
    <PropertyGroup key={group} group={group} items={props} />
  ));
};
