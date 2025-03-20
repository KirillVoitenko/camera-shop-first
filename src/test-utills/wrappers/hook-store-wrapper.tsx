import { Store, AnyAction } from '@reduxjs/toolkit';
import { HistoryRouter } from '@shared/ui/history-router';
import { MemoryHistory, createMemoryHistory } from 'history';
import { FC } from 'react';
import { Provider } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStoreWrapper = (store: Store<any, AnyAction>, history?: MemoryHistory): FC => {
  const memoryHistory = history ?? createMemoryHistory();
  // eslint-disable-next-line react/display-name
  return ({ children }: { children?: React.ReactNode }) => (
    <HistoryRouter history={memoryHistory}>
      <Provider store={store}>
        {children}
      </Provider>
    </HistoryRouter>
  );
};
