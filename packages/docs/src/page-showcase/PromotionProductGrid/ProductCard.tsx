import { Body, Caption, HStack, Image, VStack } from '@app/ui-system';
import type { FC } from 'react';

export type Props = {
  imageSrc: string;
  category: string;
  name: string;
  price: string;
  originalPrice: string;
};

export const ProductCard: FC<Props> = ({ imageSrc, category, name, price, originalPrice }) => (
  <VStack className={['gap-16', 'group']}>
    <VStack
      className={[
        'bg-white',
        'rounded-lg',
        'border',
        'overflow-hidden',
        'aspect-square',
        'items-center',
        'justify-center',
      ]}
    >
      <Image src={imageSrc} alt={name} className="w-full h-full object-contain" />
    </VStack>
    <VStack>
      <Caption className={['text-neutral-500']}>{category}</Caption>
      <Body className={['font-medium']}>{name}</Body>
      <HStack alignVertical="center" className={['gap-6', 'items-center']}>
        <Body className={['font-bold', 'text-orange-500']}>{price}</Body>
        <Body size="sm" className={['text-neutral-400', 'line-through']}>
          {originalPrice}
        </Body>
      </HStack>
    </VStack>
  </VStack>
);
