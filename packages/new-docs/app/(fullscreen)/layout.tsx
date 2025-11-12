import '@app/globals.css';

import { getPageMap } from 'nextra/page-map';
import { Layout } from 'nextra-theme-docs';
import type { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const FullscreenLayout: FC<Props> = async ({ children }) => (
  <Layout
    navbar={null}
    pageMap={await getPageMap()}
    editLink={null}
    darkMode={false}
    feedback={{ content: null }}
    docsRepositoryBase="https://github.com/composify-js/composify/tree/main/packages/docs"
  >
    {children}
  </Layout>
);

export default FullscreenLayout;
