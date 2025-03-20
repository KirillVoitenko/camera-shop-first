import { generateProductMock } from '@test-utills/mocks/product';
import {
  PickedProductsState,
  productsDataSelector,
  productsLoadingSelector
} from '../selectors';

describe('Products slice selectors', () => {
  describe('products loading selector', () => {
    it('should return correct state', () => {
      const expectedState: PickedProductsState = {
        products: {
          loading: false,
          products: []
        }
      };

      const result = productsLoadingSelector(expectedState);

      expect(result).toBe(expectedState.products.loading);
    });
  });

  describe('products data selector', () => {
    it('should return correct state', () => {
      const products = [generateProductMock()];
      const expectedState: PickedProductsState = {
        products: {
          loading: false,
          products
        }
      };

      const result = productsDataSelector(expectedState);

      expect(result).toBe(products);
    });
  });
});
