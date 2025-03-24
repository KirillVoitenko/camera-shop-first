import { generateProductMock, generatePromoProductMock } from '@test-utills/mocks/product';
import { Product, PromoProduct } from '../../types';
import { productSliceReducer } from '../products-slice';
import { INITIAL_STATE } from '../products-slice';
import { emptyAction } from '@test-utills/mocks/redux';
import { ProductSliceState } from '../types';
import { fetchProductsAction } from '../actions';

describe('Products list reducer', () => {
  let productMock: Product;
  let initialState: ProductSliceState;
  let promoProductMock: PromoProduct;

  beforeEach(() => {
    productMock = generateProductMock();
    promoProductMock = generatePromoProductMock();
    initialState = { ...INITIAL_STATE };
  });

  it('should return \'initialState\' by Action=undefined', () => {
    const expectedState = initialState;

    const result = productSliceReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return \'initialState\' by empty action', () => {
    const expectedState = initialState;

    const result = productSliceReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by \'fetchProductsAction.pending\' action', () => {
    const expectedState: ProductSliceState = { ...INITIAL_STATE, loading: true };

    const result = productSliceReducer(INITIAL_STATE, fetchProductsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by \'fetchProductsAction.fullfilled\' action', () => {
    const products = [productMock];
    const promos = [promoProductMock];
    const expectedState: ProductSliceState = { ...INITIAL_STATE, loading: false, products, promos };

    const result = productSliceReducer(INITIAL_STATE, fetchProductsAction.fulfilled({products, promos }, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by \'fetchProductsAction.rejected\' action', () => {
    const expectedState: ProductSliceState = { ...INITIAL_STATE, loading: false };

    const result = productSliceReducer(INITIAL_STATE, fetchProductsAction.rejected);

    expect(result).toEqual(expectedState);
  });
});
