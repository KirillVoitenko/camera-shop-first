import { render } from '@testing-library/react';
import { BasketItem } from '../basket-item';
import { BasketItemShort, ProductInBasket } from '@features/basket/model/types';
import faker from 'faker';
import { generateProductMock } from '@test-utills/mocks/product';
import { moneyFormat } from '@shared/lib/format';
import { BasketItemQuantityTestId, BasketItemTestId } from '@features/basket/config/const';
import userEvent from '@testing-library/user-event';

const BASKET_PRODUCT_CARD_TEST_ID = 'basket-item';

describe('component \'BasketItem\'', () => {
  const fakeProduct = generateProductMock();
  const addItemMock = vi.fn();
  const updateItemMock = vi.fn();
  const deleteItemMock = vi.fn();
  const deleteModalOpenMock = vi.fn();
  const fakeBasketItemMock: BasketItemShort = {
    count: faker.datatype.number({ min: 1, max: 10 }),
    productId: fakeProduct.id
  };
  const productInBasket: ProductInBasket = {
    count: fakeBasketItemMock.count,
    product: fakeProduct
  };

  beforeEach(() => {
    addItemMock.mockReset();
    updateItemMock.mockReset();
    deleteItemMock.mockReset();
    deleteModalOpenMock.mockReset();
  });

  it('should correct render', async () => {
    vi.spyOn(await import('@features/basket/lib/use-basket'), 'useBasket').mockImplementation(() => ({
      addItem: addItemMock,
      basket: [fakeBasketItemMock],
      deleteItem: deleteItemMock,
      updateItem: updateItemMock
    }));

    const screen = render(<BasketItem item={productInBasket} onDeleteItem={deleteModalOpenMock}/>);

    expect(screen.getByText(moneyFormat(fakeProduct.price), { collapseWhitespace: false })).toBeInTheDocument();
    expect(screen.getByText(moneyFormat(fakeProduct.price * fakeBasketItemMock.count), { collapseWhitespace: false })).toBeInTheDocument();
    expect(screen.getByTestId(BasketItemTestId.DeleteButton)).toBeInTheDocument();
    expect(screen.getByTestId(BasketItemQuantityTestId.Container)).toBeInTheDocument();
    expect(screen.getByTestId(BASKET_PRODUCT_CARD_TEST_ID)).toBeInTheDocument();
  });

  it('should call \'onDeleteItem\' callback if delete button clicked', async () => {
    vi.spyOn(await import('@features/basket/lib/use-basket'), 'useBasket').mockImplementation(() => ({
      addItem: addItemMock,
      basket: [fakeBasketItemMock],
      deleteItem: deleteItemMock,
      updateItem: updateItemMock
    }));

    const screen = render(<BasketItem item={productInBasket} onDeleteItem={deleteModalOpenMock}/>);
    const deleteItemElement = screen.getByTestId(BasketItemTestId.DeleteButton);

    await userEvent.click(deleteItemElement);

    expect(deleteModalOpenMock).toBeCalledTimes(1);
  });
});
