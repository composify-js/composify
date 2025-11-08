/** biome-ignore-all lint/suspicious/noExplicitAny: for arbitrary values */
import type { ComponentProps, ComponentType } from 'react';
import type { PropertySpec } from '../PropertySpec';

export type BlockConfig<
  Component extends ComponentType<any> = any,
  Props = ComponentProps<Component>,
  Key extends keyof Props = keyof Props,
> = {
  category?: string;
  component: Component;
  props: {
    [key in Key]: PropertySpec<Props[key]>;
  };
};

export class Block<
  Component extends ComponentType<any> = any,
  Props = ComponentProps<Component>,
  Key extends keyof Props = keyof Props,
> {
  public static readonly UNCATEGORIZED = 'Uncategorized';
  public static readonly UNGROUPED = 'Default';

  public readonly name: string;
  public readonly category: string;
  public readonly component: Component;
  public readonly props: {
    [key in Key]: PropertySpec<Props[key]>;
  };

  constructor(name: string, config: BlockConfig) {
    this.name = name;
    this.category = config.category ?? Block.UNCATEGORIZED;
    this.component = config.component;
    this.props = config.props as {
      [key in Key]: PropertySpec<Props[key]>;
    };

    this.populateDefaults();
  }

  public getGroupedProps() {
    const propsByGroup: Record<string, Record<string, PropertySpec<any>>> = {};

    for (const key in this.props) {
      const spec = this.props[key];
      const group = spec.group ?? Block.UNGROUPED;

      propsByGroup[group] ||= {};
      propsByGroup[group][key] = spec;
    }

    return propsByGroup;
  }

  private populateDefaults() {
    for (const spec of Object.values(this.props)) {
      const typedSpec = spec as PropertySpec<any>;

      this.setSpecDefault(typedSpec);
    }
  }

  private setSpecDefault(spec: PropertySpec<any>) {
    spec.hasDefault = typeof spec.default !== 'undefined';

    switch (spec.type) {
      case 'array':
        spec.default ??= [];
        this.setSpecDefault(spec.item);
        break;
      case 'boolean':
        spec.default ??= false;
        break;
      case 'node':
        spec.default ??= null;
        break;
      case 'number':
        spec.default ??= 0;
        break;
      case 'object':
        for (const field of Object.values(spec.fields)) {
          this.setSpecDefault(field);
        }
        spec.default ??= Object.fromEntries(Object.entries(spec.fields).map(([key, field]) => [key, field.default]));
        break;
      case 'custom':
        break;
      case 'radio':
        spec.default ??= 'value' in spec.options[0] ? spec.options[0].value : spec.options[0];
        break;
      case 'select':
        spec.default ??= spec.options[0]?.value;
        break;
      case 'text':
      case 'textarea':
        spec.default ??= '';
        break;
      default:
        throw new Error('Unknown property spec');
    }
  }
}
