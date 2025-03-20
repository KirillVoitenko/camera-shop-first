import { generateProductMock } from '@test-utills/mocks/product';
import {
  productDataSelector,
  productLoadingSelector,
  productCommentsSelector,
  productSimilarsSelector,
  PickedProductSliceState
} from '../selectors';
import { generateCommentMock } from '@test-utills/mocks/comment';

describe('Product slice selectors', () => {
  const stateMock: PickedProductSliceState = {
    product: {
      loading: false,
      product: generateProductMock(),
      comments: [generateCommentMock()],
      similarProducts: [generateProductMock()]
    }
  };

  it.each([
    { selector: productDataSelector, expected: stateMock.product.product, name: 'productDataSelector' },
    { selector: productLoadingSelector, expected: stateMock.product.loading, name: 'productLoadingSelector' },
    { selector: productCommentsSelector, expected: stateMock.product.comments, name: 'productCommentsSelector' },
    { selector: productSimilarsSelector, expected: stateMock.product.similarProducts, name: 'productSimilarsSelector' }
  ])('$name should return correct data', ({ expected, selector }) => {
    const result = selector(stateMock);

    expect(result).toEqual(expected);
  });
});
