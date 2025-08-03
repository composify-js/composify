import { isMultiColumnFooterLinks, ThemeClassNames } from '@docusaurus/theme-common';
import LinkItem from '@theme/Footer/LinkItem';
import { Props } from '@theme/Footer/Links';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

export const FooterLinks = ({ links }: Props): ReactNode =>
  isMultiColumnFooterLinks(links)
    ? links.map((column, i) => (
        <div key={i} className={clsx(ThemeClassNames.layout.footer.column, 'col footer__col', column.className)}>
          <div className="footer__title">{column.title}</div>
          <ul className="footer__items clean-list">
            {column.items.map(item => (
              <li key={item.href ?? item.to} className="footer__item">
                <LinkItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      ))
    : null;
