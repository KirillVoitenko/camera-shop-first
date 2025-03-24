import { combineReducers } from '@reduxjs/toolkit';
import { productSliceReducer } from '@entities/product';
import { productSlicePageReducer } from '@pages/product-page';
import { basketSliceReducer } from '@features/basket';

export const rootReducer = combineReducers({
  products: productSliceReducer,
  product: productSlicePageReducer,
  basket: basketSliceReducer,
});
