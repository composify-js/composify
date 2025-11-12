import '@app/globals.css';

import { TopNavigation } from '@app/parcel-layout';
import { getPageMap } from 'nextra/page-map';
import { Layout } from 'nextra-theme-docs';
import type { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const NormalLayout: FC<Props> = async ({ children }) => (
  <Layout
    navbar={<TopNavigation />}
    pageMap={await getPageMap()}
    editLink={null}
    feedback={{ content: null }}
    docsRepositoryBase="https://github.com/composify-js/composify/tree/main/packages/docs"
  >
    {children}
  </Layout>
);

export default NormalLayout;
