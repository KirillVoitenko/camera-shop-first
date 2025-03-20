import { Product } from '@entities/product';
import {
  productSlicePageReducer,
  INITIAL_STATE,
} from '../product-slice';
import { ProductSliceState } from '../types';
import { generateProductMock } from '@test-utills/mocks/product';
import { emptyAction } from '@test-utills/mocks/redux';
import { fetchProductAction, FetchProductActionReturn } from '../actions';
import { generateCommentMock } from '@test-utills/mocks/comment';

describe('Product slice reducer', () => {
  let productMock: Product;
  let initialState: ProductSliceState;

  beforeEach(() => {
    productMock = generateProductMock();
    initialState = { ...INITIAL_STATE };
  });

  it('should return \'initialState\' by Action=undefined', () => {
    const expectedState = initialState;

    const result = productSlicePageReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return \'initialState\' by empty action', () => {
    const expectedState = initialState;

    const result = productSlicePageReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return \'initialState\' by \'fetchProductAction.pending\' action', () => {
    const expectedState: ProductSliceState = {
      ...initialState,
      loading: true
    };

    const result = productSlicePageReducer(initialState, fetchProductAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return \'initialState\' by \'fetchProductAction.fullfilled\' action', () => {
    const actionReturnMock: FetchProductActionReturn = {
      comments: [generateCommentMock()],
      product: productMock,
      similarProducts: [generateProductMock()]
    };

    const expectedState: ProductSliceState = {
      ...initialState,
      loading: false,
      product: actionReturnMock.product,
      comments: actionReturnMock.comments,
      similarProducts: actionReturnMock.similarProducts
    };

    const result = productSlicePageReducer(initialState, fetchProductAction.fulfilled(actionReturnMock, '', {cameraId: productMock.id}));

    expect(result).toEqual(expectedState);
  });

  it('should return \'initialState\' by \'fetchProductAction.rejected\' action', () => {
    const expectedState: ProductSliceState = {
      ...initialState,
      loading: false,
      product: null,
    };

    const result = productSlicePageReducer(initialState, fetchProductAction.rejected);

    expect(result).toEqual(expectedState);
  });
});
