import { render } from '@testing-library/react';
import { withStore } from '@test-utills/wrappers';
import { generateProductMock } from '@test-utills/mocks/product';
import { ProductsList } from '../products-list';
import { PRODUCTS_LIST_CONTAINER_TEST_ID } from '@features/products-list/config/const';
import faker from 'faker';
import { createMemoryHistory } from 'history';

const PRODUCT_CARD_TEST_ID = 'short-product-card-container';

const PRODUCTS_MOCK = Array.from({ length: faker.datatype.number({min: 1, max: 20 }) }).map(generateProductMock);

describe('Component \'ProductsList\'', () => {
  const history = createMemoryHistory();

  it('should correct render', () => {
    const { wrappedComponent } = withStore(<ProductsList onBuyButtonClick={vi.fn()} />, { products: { loading: false, products: PRODUCTS_MOCK, promos: [] } }, [], history);

    const screen = render(wrappedComponent);

    expect(screen.getByTestId(PRODUCTS_LIST_CONTAINER_TEST_ID)).toBeInTheDocument();
    expect(screen.queryAllByTestId(PRODUCT_CARD_TEST_ID).length).toBe(PRODUCTS_MOCK.length);
  });
});
