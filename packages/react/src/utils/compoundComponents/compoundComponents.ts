/** biome-ignore-all lint/suspicious/noExplicitAny: To accept any component */
import type { ComponentType } from 'react';

export function compoundComponents<
  Parent extends ComponentType<any>,
  Children extends Record<string, ComponentType<any>>,
>(ParentComponent: Parent, children: Children): Parent & Children {
  return Object.assign(ParentComponent, children) as Parent & Children;
}
