import { Body, Heading, HStack, Slider, VStack } from '@app/ui-system';
import { type FC, useState } from 'react';

const PAGES = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '10',
  '15',
  '20',
  '25',
  '50',
  '75',
  '100',
  '150',
  '200',
  '250',
  '300',
  '400',
  '500',
  '750',
  '1,000+',
];
const MEMBERS = ['1', '2', '3', '4', '5', '10', '15', '20', '25', '30', '40', '50', '75', '100+'];

const PAGES_PRICE = 1;
const MEMBERS_PRICE = 5;

export const PriceCalculator: FC = () => {
  const [pages, setPages] = useState(0);
  const [members, setMembers] = useState(0);

  const effectivePages = parseInt(PAGES[pages].replace(/\D/g, ''), 10);
  const effectiveSeats = parseInt(MEMBERS[members].replace(/\D/g, ''), 10);

  const proPrice =
    29 + Math.max((effectivePages - 30) * PAGES_PRICE, 0) + Math.max((effectiveSeats - 3) * MEMBERS_PRICE, 0);
  const businessPrice = 99 + Math.max((effectivePages - 100) * PAGES_PRICE, 0);

  const price = effectivePages <= 1 && effectiveSeats <= 1 ? 0 : Math.min(proPrice, businessPrice);
  const plan = price === 0 ? 'Free' : price === businessPrice ? 'Business' : 'Pro';

  return (
    <VStack className={['m-24', 'max-md:m-16', 'rounded-sm', 'border', 'bg-background', 'overflow-hidden']}>
      <HStack className={['border-b', 'max-md:flex-col']}>
        <VStack
          className={[
            'flex-1',
            'p-28',
            'max-md:p-24',
            'pb-20',
            'max-md:pb-16',
            'gap-4',
            'border-b-0',
            'border-r',
            'max-md:border-b',
            'max-md:border-r-0',
          ]}
        >
          <HStack alignHorizontal="between" alignVertical="end" className={['mb-4']}>
            <Body size="xl" className={['font-semibold', 'text-foreground']}>
              Pages
            </Body>
            <Body size="md">
              {PAGES[pages]} page{pages > 0 ? 's' : ''}
            </Body>
          </HStack>
          <Slider min={0} max={PAGES.length - 1} className={['my-8']} value={pages} onChange={setPages} />
          <HStack alignHorizontal="between" className={['px-2', 'pt-2', 'pb-8']}>
            <Body size="sm" className={['opacity-80']}>
              {PAGES[0]} pages
            </Body>
            <Body size="sm" className={['opacity-80']}>
              {PAGES[PAGES.length - 1]} pages
            </Body>
          </HStack>
        </VStack>
        <VStack className={['flex-1', 'p-28', 'max-md:p-24', 'pb-20', 'max-md:pb-16', 'gap-4']}>
          <HStack alignHorizontal="between" alignVertical="end" className={['mb-4']}>
            <Body size="xl" className={['font-semibold', 'text-foreground']}>
              Members
            </Body>
            <Body size="md">
              {MEMBERS[members]} member{members > 0 ? 's' : ''}
            </Body>
          </HStack>
          <Slider min={0} max={MEMBERS.length - 1} className={['my-8']} value={members} onChange={setMembers} />
          <HStack alignHorizontal="between" className={['px-2', 'pt-2', 'pb-8']}>
            <Body size="sm" className={['opacity-80']}>
              {MEMBERS[0]} members
            </Body>
            <Body size="sm" className={['opacity-80']}>
              {MEMBERS[MEMBERS.length - 1]} members
            </Body>
          </HStack>
        </VStack>
      </HStack>
      <HStack
        alignHorizontal="between"
        alignVertical="center"
        className={['p-24', 'px-28', 'bg-background-variant', 'max-sm:items-baseline']}
      >
        <Heading level={3} size="2xl" weight="semibold" className={['max-sm:text-xl']}>
          {plan} Plan
        </Heading>
        <HStack alignVertical="end">
          <Heading level={3} size="3xl" className={['max-sm:text-2xl']}>
            ${price.toFixed(2)}
            {pages === PAGES.length - 1 ? '+' : ''}
          </Heading>
          <Body size="md" className={['mb-2', 'opacity-80', 'max-sm:text-sm']}>
            &nbsp;/ mo
          </Body>
        </HStack>
      </HStack>
    </VStack>
  );
};
