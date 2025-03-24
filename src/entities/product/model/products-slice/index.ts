import { fetchProductsAction } from './actions';
import { productSliceReducer } from './products-slice';
import {
  productsLoadingSelector,
  productsDataSelector,
  promoProductsDataSelector
} from './selectors';

export {
  fetchProductsAction,
  productSliceReducer,
  productsLoadingSelector,
  productsDataSelector,
  promoProductsDataSelector
};
