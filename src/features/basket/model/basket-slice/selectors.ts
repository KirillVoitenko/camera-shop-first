import type { RootState } from '@shared/model/redux';

export type PickedBasketState = Pick<RootState, 'basket'>;

export const basketLoadingSelector = (state: PickedBasketState) => state.basket.loading;

export const basketDataSelector = (state: PickedBasketState) => state.basket.basket;

export const basketCouponSelector = (state: PickedBasketState) => state.basket.coupon;
