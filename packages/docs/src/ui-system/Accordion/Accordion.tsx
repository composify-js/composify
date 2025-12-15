import { ChevronDown } from 'lucide-react';
import type { FC, PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './AccordionVariants';

type Props = VariantProps<typeof variants> &
  PropsWithChildren<{
    className?: string[];
    summary: string;
  }>;

export const Accordion: FC<Props> = ({ className, summary, children }) => (
  <details className={variants().container({ className })}>
    <summary className={variants().header()}>
      <h3 className={variants().summary()}>{summary}</h3>
      <ChevronDown className={variants().chevron()} />
    </summary>
    <p className={variants().content()}>{children}</p>
  </details>
);
