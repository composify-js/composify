import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  variant: 'primary' | 'outline';
}>;

export const Button = ({ variant, children }: Props) => {
  const className =
    variant === 'primary'
      ? 'bg-blue-500 border-blue-500 text-neutral-100'
      : 'border border-neutral-200 text-neutral-900';

  return <button className={`px-5 py-3 text-base rounded ${className}`}>{children}</button>;
};
