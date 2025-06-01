import { render } from '@testing-library/react';
import { withStore } from '@test-utills/wrappers';
import { generateProductMock } from '@test-utills/mocks/product';
import faker from 'faker';
import { Basket } from '../basket';
import { createMemoryHistory } from 'history';
import { BasketItemShort } from '@features/basket/model/types';

const history = createMemoryHistory();
const FAKE_PRODUCT = generateProductMock();
const FAKE_BASKET_ITEM: BasketItemShort = {
  count: faker.datatype.number(),
  productId: FAKE_PRODUCT.id
};

const BASKET_ITEM_TEST_ID = 'basket-item';

describe('component \'Basket\'', () => {
  it('should correct render if items exists', () => {
    const { wrappedComponent } = withStore(
      <Basket />,
      {
        products: {
          loading: false,
          products: [FAKE_PRODUCT],
          promos: []
        },
        basket: {
          basket: [FAKE_BASKET_ITEM],
          loading: false,
          coupon: {
            status: 'success',
            data: {
              coupon: null,
              discountPercent: 0
            }
          }
        }
      },
      undefined,
      history
    );

    const screen = render(wrappedComponent);
    expect(screen.getAllByTestId(BASKET_ITEM_TEST_ID).length).toBe(1);
  });
});
