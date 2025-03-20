import { createAction } from '@reduxjs/toolkit';

export type RedirectActionPayload = {
  route: string;
  replace?: boolean;
}

export const redirectToRouteAction = createAction<RedirectActionPayload>('routing/redirectToRoute');
