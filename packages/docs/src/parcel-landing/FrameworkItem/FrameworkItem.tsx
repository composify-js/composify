import { Body, HStack, Image } from '@app/ui-system';
import { CheckIcon } from 'lucide-react';
import type { FC } from 'react';

type Props = {
  icon: string;
  name: string;
  selected?: boolean;
};

export const FrameworkItem: FC<Props> = ({ icon, name, selected }) => (
  <HStack alignVertical="center" className={['gap-8', 'px-10', 'py-6', 'rounded-lg', selected ? 'bg-muted' : '']}>
    <Image src={icon} alt={name} width={16} height={16} />
    <Body size="md">{name}</Body>
    {selected && <CheckIcon size={16} className="ml-auto text-foreground-variant" />}
  </HStack>
);
