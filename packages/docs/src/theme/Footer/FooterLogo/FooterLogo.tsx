import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { Props } from '@theme/Footer/Logo';
import ThemedImage from '@theme/ThemedImage';
import React, { ReactNode } from 'react';

const LogoImage = ({ logo }: Props) => {
  const { withBaseUrl } = useBaseUrlUtils();

  const sources = {
    light: withBaseUrl(logo.src),
    dark: withBaseUrl(logo.srcDark ?? logo.src),
  };

  return (
    <ThemedImage
      className={logo.className}
      alt={logo.alt}
      sources={sources}
      width={logo.width}
      height={logo.height}
      style={logo.style}
    />
  );
};

export const FooterLogo = ({ logo }: Props): ReactNode =>
  logo.href ? (
    <Link href={logo.href} target={logo.target}>
      <LogoImage logo={logo} />
    </Link>
  ) : (
    <LogoImage logo={logo} />
  );
