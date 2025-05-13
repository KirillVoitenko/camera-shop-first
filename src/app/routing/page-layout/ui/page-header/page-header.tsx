import { Layout } from '@shared/ui/layout';
import { Logo } from '@shared/ui/logo';
import { JSX } from 'react';
import { PAGE_HEADER_TEST_ID } from '../../config/const';
import { HeaderNavigation } from '../header-navigation';
import { ProductSearch } from '@features/product-search';
import { BasketLink } from '@features/basket';

export function PageHeader(): JSX.Element {
  return (
    <Layout.Header>
      <div className='container' data-testid={PAGE_HEADER_TEST_ID}>
        <Logo type='header' />
        <HeaderNavigation />
        <ProductSearch />
        <BasketLink className='header__basket-link' />
      </div>
    </Layout.Header>
  );
}
