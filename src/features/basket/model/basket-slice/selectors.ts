import type { RootState } from '@shared/model/redux';

export type PickedBasketState = Pick<RootState, 'basket'>;

export const basketLoadingSelector = (state: PickedBasketState) => state.basket.loading;
