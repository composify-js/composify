import { Button, Link } from '@app/ui-system';
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
