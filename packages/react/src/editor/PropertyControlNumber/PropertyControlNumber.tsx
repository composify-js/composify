import { NumberPropertySpec } from '@composify/core';
import { PropertyControlNumberMultiple } from './PropertyControlNumberMultiple';
import { PropertyControlNumberSingle } from './PropertyControlNumberSingle';

type Props = {
  name: string;
  spec: NumberPropertySpec<number | number[]>;
};

export const PropertyControlNumber = ({ name, spec }: Props) =>
  spec.list ? (
    <PropertyControlNumberMultiple name={name} spec={spec} />
  ) : (
    <PropertyControlNumberSingle name={name} spec={spec} />
  );
