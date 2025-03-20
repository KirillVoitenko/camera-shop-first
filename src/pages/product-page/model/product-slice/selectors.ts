import { RootState } from '@shared/model/redux';

export type PickedProductSliceState = Pick<RootState, 'product'>;

export const productLoadingSelector = (state: PickedProductSliceState) => state.product.loading;
export const productDataSelector = (state: PickedProductSliceState) => state.product.product;
export const productCommentsSelector = (state: PickedProductSliceState) => state.product.comments;
export const productSimilarsSelector = (state: PickedProductSliceState) => state.product.similarProducts;
