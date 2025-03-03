import { JSX } from 'react';
import { createBrowserHistory } from 'history';
import { HistoryRouter } from '@shared/ui/history-router';
import { AppRoutes } from '../app-routes';

const history = createBrowserHistory();

export function RouterProvider(): JSX.Element {
  return (
    <HistoryRouter history={history}>
      <AppRoutes />
    </HistoryRouter>
  );
}
