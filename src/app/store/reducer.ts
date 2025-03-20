import { combineReducers } from '@reduxjs/toolkit';
import { productSliceReducer } from '@entities/product';
import { productSlicePageReducer } from '@pages/product-page';

export const rootReducer = combineReducers({
  products: productSliceReducer,
  product: productSlicePageReducer
});
