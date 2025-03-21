import { productSlicePageReducer } from './product-slice';
import { fetchProductAction } from './actions';
import {
  productDataSelector,
  productLoadingSelector,
  productCommentsSelector,
  productSimilarsSelector
} from './selectors';

export {
  productSlicePageReducer,
  productDataSelector,
  productLoadingSelector,
  productCommentsSelector,
  productSimilarsSelector,
  fetchProductAction
};
