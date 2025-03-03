import { Layout } from '@shared/ui/layout';
import { Logo } from '@shared/ui/logo';
import { JSX } from 'react';
import { PAGE_HEADER_TEST_ID } from '../../config/const';
import { HeaderNavigation } from '../header-navigation';

export function PageHeader(): JSX.Element {
  return (
    <Layout.Header>
      <div className='container' data-testid={PAGE_HEADER_TEST_ID}>
        <Logo type='header' />
        <HeaderNavigation />
      </div>
    </Layout.Header>
  );
}
