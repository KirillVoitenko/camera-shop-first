import { JSX, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoutesEnum } from '@shared/model/enums';
import { PageLayout } from '../page-layout/ui/page-layout';

const MainPage = lazy(() => import('@pages/main-page'));
const ProductPage = lazy(() => import('@pages/product-page'));
const NotFoundPage = lazy(() => import('@pages/not-found-page'));

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoutesEnum.Main} element={<PageLayout />}>
        <Route
          index
          element={
            <Suspense>
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path={AppRoutesEnum.Product}
          element={
            <Suspense>
              <ProductPage />
            </Suspense>
          }
        />
        <Route
          path={'*'}
          element={
            <Suspense>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
