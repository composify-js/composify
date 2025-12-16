import { VStack } from '@app/ui-system';
import { CloudFeatureGroup } from './CloudFeatureGroup';
import { CloudHeroBanner } from './CloudHeroBanner';
import { FAQSection } from './FAQSection';
import { FreeSetupSection } from './FreeSetupSection';
import { PlanGroup } from './PlanGroup';
import { PriceCalculator } from './PriceCalculator';

export const CloudPage = () => (
  <VStack>
    <CloudHeroBanner />
    <PriceCalculator />
    <PlanGroup />
    <CloudFeatureGroup />
    <FAQSection />
    <FreeSetupSection />
  </VStack>
);
