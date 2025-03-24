import { RootState } from '@shared/model/redux';

export type PickedProductsState = Pick<RootState, 'products'>;

export const productsLoadingSelector = (state: PickedProductsState) => state.products.loading;

export const productsDataSelector = (state: PickedProductsState) => state.products.products;

export const promoProductsDataSelector = (state: PickedProductsState) => state.products.promos;
