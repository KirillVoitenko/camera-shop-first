import { fetchProductsAction } from './actions';
import { productSliceReducer } from './products-slice';
import {
  productsLoadingSelector,
  productsDataSelector
} from './selectors';

export {
  fetchProductsAction,
  productSliceReducer,
  productsLoadingSelector,
  productsDataSelector
};
