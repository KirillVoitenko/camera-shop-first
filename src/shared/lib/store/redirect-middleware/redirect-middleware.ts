import { PayloadAction } from '@reduxjs/toolkit';
import { BrowserHistory } from 'history';
import { Middleware } from '@reduxjs/toolkit';
import {
  redirectToRouteAction,
  type RedirectActionPayload
} from './actions';

export function createRedirectMiddleware<TAction extends RedirectActionPayload = RedirectActionPayload>(history: BrowserHistory): Middleware {
  return () =>
    (next) =>
      (action: PayloadAction<TAction>) => {
        if (action.type === redirectToRouteAction.toString()) {
          if (action.payload?.replace) {
            history.replace(action.payload.route);
          } else {
            history.push(action.payload.route);
          }
        }

        return next(action);
      };
}
