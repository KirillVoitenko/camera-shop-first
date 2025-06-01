import { render } from '@testing-library/react';
import { withStore } from '@test-utills/wrappers';
import { generateProductMock } from '@test-utills/mocks/product';
import { ProductsList } from '../products-list';
import { PRODUCTS_LIST_CONTAINER_TEST_ID } from '@widgets/products-list/config/const';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import { RootState } from '@shared/model/redux';

const PRODUCT_CARD_TEST_ID = 'short-product-card-container';

const PRODUCTS_MOCK = Array.from({ length: faker.datatype.number({min: 1, max: 20 }) }).map(generateProductMock);
const STORE_MOCK: Partial<RootState> = { products: { loading: false, products: PRODUCTS_MOCK, promos: [] }, basket: { loading: false, basket: [], coupon: {data: null, status: 'error'} } };

describe('Component \'ProductsList\'', () => {
  const history = createMemoryHistory();

  it('should correct render', () => {
    const { wrappedComponent } = withStore(<ProductsList products={PRODUCTS_MOCK} />, STORE_MOCK, [], history);

    const screen = render(wrappedComponent);

    expect(screen.getByTestId(PRODUCTS_LIST_CONTAINER_TEST_ID)).toBeInTheDocument();
    expect(screen.queryAllByTestId(PRODUCT_CARD_TEST_ID).length).toBe(PRODUCTS_MOCK.length);
  });
});
