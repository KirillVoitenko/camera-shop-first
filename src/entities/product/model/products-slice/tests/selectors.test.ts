import { generateProductMock, generatePromoProductMock } from '@test-utills/mocks/product';
import {
  PickedProductsState,
  productsDataSelector,
  productsLoadingSelector,
  promoProductsDataSelector
} from '../selectors';

type EachArg = {
  selector: (state: PickedProductsState) => unknown;
  state: PickedProductsState;
  expected: unknown;
  name: string;
}

describe('Products slice selectors', () => {
  const promoProducts = [generatePromoProductMock()];
  const products = [generateProductMock()];

  it.each<EachArg>([
    {
      expected: true,
      name: 'productsLoadingSelector',
      selector: productsLoadingSelector,
      state: {
        products: {
          loading: true,
          products: [],
          promos: []
        }
      }
    },
    {
      expected: products,
      name: 'productsDataSelector',
      selector: productsDataSelector,
      state: {
        products: {
          loading: false,
          products: products,
          promos: []
        }
      }
    },
    {
      expected: promoProducts,
      name: 'promoProductsDataSelector',
      selector: promoProductsDataSelector,
      state: {
        products: {
          loading: false,
          products: [],
          promos: promoProducts
        }
      }
    },
  ])('selector $name should return correct state', ({ expected, selector, state }) => {
    const result = selector(state);

    expect(result).toEqual(expected);
  });
});
