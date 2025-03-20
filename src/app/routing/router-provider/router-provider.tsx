import { JSX } from 'react';
import { HistoryRouter } from '@shared/ui/history-router';
import { AppRoutes } from '../app-routes';
import { APP_HISTORY } from '@app/config/routing';

export function RouterProvider(): JSX.Element {
  return (
    <HistoryRouter history={APP_HISTORY}>
      <AppRoutes />
    </HistoryRouter>
  );
}
