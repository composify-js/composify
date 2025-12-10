import { VStack } from '@app/ui-system';
import { CloudFeatureGroup } from './CloudFeatureGroup';
import { CloudHeroBanner } from './CloudHeroBanner';
import { PlanGroup } from './PlanGroup';
import { PriceCalculator } from './PriceCalculator';

export const CloudPage = () => (
  <VStack>
    <CloudHeroBanner />
    <PriceCalculator />
    <PlanGroup />
    <CloudFeatureGroup />
  </VStack>
);
