import { RouterProvider } from '@app/routing/router-provider';
import { JSX } from 'react';
import { HelmetProvider } from 'react-helmet-async';

export function Application(): JSX.Element {
  return (
    <HelmetProvider>
      <RouterProvider />
    </HelmetProvider>
  );
}
