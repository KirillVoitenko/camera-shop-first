import { Layout } from '@shared/ui/layout';
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { PageHeader } from '../page-header';
import { LAYOUT_TEST_ID } from '../../config/const';
import { PageFooter } from '../page-footer';

export function PageLayout(): JSX.Element {
  return (
    <Layout data-testid={LAYOUT_TEST_ID}>
      <PageHeader />
      <Outlet />
      <PageFooter />
    </Layout>
  );
}
