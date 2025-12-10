import { Caption, HStack, VStack } from '@app/ui-system';
import type { FC } from 'react';
import { PlanItem } from '../PlanItem';

export const PlanGroup: FC = () => (
  <VStack className={['p-24', 'max-md:p-16']}>
    <HStack className={['rounded-sm', 'border', 'bg-background', 'overflow-hidden', 'max-lg:flex-col']}>
      <PlanItem
        title="Free"
        description="Proof of concept, at no cost."
        price="$0"
        interval="&nbsp;/ mo"
        features={[
          { label: '1 Page' },
          { label: '1 Member' },
          { label: 'Unlimited Bandwidth' },
          { label: 'Unlimited Page Views' },
        ]}
      />
      <PlanItem
        title="Pro"
        description="Everything you need to build and grow."
        price="$29"
        interval="&nbsp;/ mo + usage"
        features={[
          { label: '30 Pages', caption: '+ then $1 per page' },
          { label: '3 Members', caption: '+ then $5 per member' },
          { label: 'Unlimited Bandwidth' },
          { label: 'Unlimited Page Views' },
          { label: 'Real-time Collaboration', planned: true },
          { label: 'Version History with Time-travel', planned: true },
        ]}
        recommended={true}
      />
      <PlanItem
        title="Business"
        description="Unlock the full potential of your team."
        price="$99"
        interval="&nbsp;/ mo + usage"
        features={[
          { label: '100 Pages', caption: '+ then $1 per page' },
          { label: 'Unlimited Members' },
          { label: 'Unlimited Bandwidth' },
          { label: 'Unlimited Page Views' },
          { label: 'Real-time Collaboration', planned: true },
          { label: 'Version History with Time-travel', planned: true },
          { label: 'Templates for Repeated Patterns', planned: true },
        ]}
      />
    </HStack>
    <Caption align="right" className={['mt-8']}>
      * Features shown in gray are planned for upcoming releases.
    </Caption>
  </VStack>
);
