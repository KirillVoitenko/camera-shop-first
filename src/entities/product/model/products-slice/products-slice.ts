import { createSlice } from '@reduxjs/toolkit';
import { ProductSliceState } from './types';
import { fetchProductsAction } from './actions';

export const INITIAL_STATE: ProductSliceState = {
  loading: false,
  products: []
};

const productSlice = createSlice({
  name: 'products',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProductsAction.pending, (state) => {
      state.loading = true;
      state.products = [];
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProductsAction.rejected, (state) => {
      state.loading = false;
      state.products = [];
    });
  },
});

export const productSliceReducer = productSlice.reducer;
