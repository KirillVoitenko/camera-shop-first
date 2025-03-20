import { createSlice } from '@reduxjs/toolkit';
import { ProductSliceState } from './types';
import { fetchProductAction } from './actions';

export const INITIAL_STATE: ProductSliceState = {
  loading: false,
  product: null,
  comments: [],
  similarProducts: []
};

const productSlice = createSlice({
  name: 'product',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProductAction.pending, (state) => {
      state.loading = true;
      state.product = null;
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      const { comments, product, similarProducts } = action.payload;
      state.loading = false;
      state.product = product;
      state.comments = comments;
      state.similarProducts = similarProducts;
    });
    builder.addCase(fetchProductAction.rejected, (state) => {
      state.loading = false;
      state.product = null;
    });
  },
});

export const productSlicePageReducer = productSlice.reducer;
