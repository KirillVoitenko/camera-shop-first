import { createRedirectMiddleware } from '../redirect-middleware';
import { redirectToRouteAction, RedirectActionPayload } from '../actions';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { BrowserHistory, createMemoryHistory } from 'history';
import { AppThunkDispatch, emptyAction } from '@test-utills/mocks/redux';
import { RootState } from '@shared/model/redux';
import { Action } from '@reduxjs/toolkit';

describe('Redirect middleware', () => {
  const initialRoute = 'initial-route';
  const history = createMemoryHistory();
  const redirectMiddleware = createRedirectMiddleware((history as unknown) as BrowserHistory);
  const storeCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>([redirectMiddleware]);
  let store: ReturnType<typeof storeCreator>;

  beforeEach(() => {
    store = storeCreator();
    history.replace(initialRoute);
  });

  it('should not works by empty action', () => {
    store.dispatch(emptyAction);

    expect(history.location.pathname).toBe(initialRoute);
  });

  it('should not works by no redirectToRouteAction', () => {
    const action: Action<string> = {
      type: 'anotherAction'
    };

    store.dispatch(action);

    expect(history.location.pathname).toBe(initialRoute);
  });

  describe('by redirectToRouteAction', () => {
    it('should correct works by replace', () => {
      const newRoute = 'new-route';
      const actionPayload: RedirectActionPayload = {
        route: newRoute,
        replace: true
      };

      store.dispatch(redirectToRouteAction(actionPayload));

      expect(history.location.pathname).toBe(newRoute);
    });

    it('should correct works by push', () => {
      const newRoute = 'new-route';
      const actionPayload: RedirectActionPayload = {
        route: newRoute
      };

      store.dispatch(redirectToRouteAction(actionPayload));

      expect(history.location.pathname).toBe(newRoute);
    });
  });
});
