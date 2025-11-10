import { Button } from '@app/ui-system';
import Link from 'next/link';
import type { ComponentProps, FC } from 'react';

type Props = ComponentProps<typeof Button> & {
  href: string;
  children: string;
};

export const ButtonCta: FC<Props> = ({ href, children, ...props }) => (
  <Button {...props} asChild={true}>
    <Link href={href}>{children}</Link>
  </Button>
);
