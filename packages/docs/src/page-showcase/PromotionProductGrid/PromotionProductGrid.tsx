import { Grid, Heading, HStack, Link, VStack } from '@app/ui-system';
import type { FC } from 'react';
import { ProductCard, type Props as ProductCardProps } from './ProductCard';

type Props = {
  title: string;
  viewAll: {
    label: string;
    href: string;
  };
  products: ProductCardProps[];
};

export const PromotionProductGrid: FC<Props> = ({ title, viewAll, products }) => (
  <VStack className={['gap-32', 'p-24', 'pt-36', 'bg-neutral-50', 'max-md:px-16']}>
    <HStack alignVertical="center" alignHorizontal="between">
      <Heading level={2} size="2xl" weight="bold">
        {title}
      </Heading>
      <Link
        href={viewAll.href}
        plain={true}
        className={['text-sm', 'font-medium', 'text-orange-500', 'hover:text-orange-600']}
      >
        {viewAll.label}
      </Link>
    </HStack>
    <Grid columns={4} className={['gap-24', 'max-md:grid-cols-2']}>
      {products.map((product) => (
        <ProductCard key={product.name} {...product} />
      ))}
    </Grid>
  </VStack>
);
