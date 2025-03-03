import { useState, useLayoutEffect, PropsWithChildren } from 'react';
import { Router } from 'react-router-dom';
import type { BrowserHistory } from 'history';

type HistoryRouterProps = PropsWithChildren<{
  history: BrowserHistory;
  basename?: string;
}>;

export function HistoryRouter({
  history,
  basename,
  children
}: HistoryRouterProps) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}
