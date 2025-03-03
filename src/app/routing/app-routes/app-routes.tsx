import { JSX, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoutesEnum } from '@shared/model/enums';
import { PageLayout } from '../page-layout/ui/page-layout';

const MainPage = lazy(() => import('@pages/main-page'));

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoutesEnum.Main} element={<PageLayout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
}
