import { TextPropertySpec } from '@composify/core';
import { PropertyControlTextMultiple } from './PropertyControlTextMultiple';
import { PropertyControlTextSingle } from './PropertyControlTextSingle';

type Props = {
  name: string;
  spec: TextPropertySpec<string | string[]>;
};

export const PropertyControlText = ({ name, spec }: Props) =>
  spec.list ? (
    <PropertyControlTextMultiple name={name} spec={spec} />
  ) : (
    <PropertyControlTextSingle name={name} spec={spec} />
  );
