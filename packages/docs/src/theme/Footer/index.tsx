import { ThemeClassNames, useThemeConfig } from '@docusaurus/theme-common';
import clsx from 'clsx';
import React from 'react';
import { FooterCopyright } from './FooterCopyright';
import { FooterLinks } from './FooterLinks';
import { FooterLogo } from './FooterLogo';

const Footer = () => {
  const { footer } = useThemeConfig();

  if (!footer) {
    return null;
  }

  const { copyright, links, logo, style } = footer;

  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', {
        'footer--dark': style === 'dark',
      })}
    >
      <div className="container container-fluid">
        <div className="row footer__links">
          <div className={clsx(ThemeClassNames.layout.footer.column, 'col footer__col')}>
            <FooterLogo logo={logo} />
            <FooterCopyright copyright={copyright} />
          </div>
          <FooterLinks links={links} />
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
