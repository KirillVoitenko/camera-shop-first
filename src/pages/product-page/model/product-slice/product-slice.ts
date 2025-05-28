import { createSlice } from '@reduxjs/toolkit';
import { ProductSliceState } from './types';
import { addNewCommentAction, fetchProductAction } from './actions';

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

    builder.addCase(addNewCommentAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewCommentAction.fulfilled, (state, action) => {
      const newComment = action.payload;
      state.comments.push(newComment);
      state.loading = false;
    });
    builder.addCase(addNewCommentAction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const productSlicePageReducer = productSlice.reducer;
