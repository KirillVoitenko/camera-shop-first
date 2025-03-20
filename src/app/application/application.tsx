import { RouterProvider } from '@app/routing/router-provider';
import { JSX } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from '@shared/ui/toast-container';
import { useStartup } from './use-startup';
import { GlobalLoader } from '@shared/ui/global-loader';
import { productsLoadingSelector } from '@entities/product';
import { productLoadingSelector } from '@pages/product-page';

export function Application(): JSX.Element {
  useStartup();
  return (
    <HelmetProvider>
      <GlobalLoader
        productListLoadingSelector={productsLoadingSelector}
        productPageLoadingSelector={productLoadingSelector}
      />
      <RouterProvider />
      <ToastContainer />
    </HelmetProvider>
  );
}
