import { render } from '@testing-library/react';
import { generateProductMock } from '@test-utills/mocks/product';
import { AddToBasketModalContent } from '../add-to-basket-modal-content';
import { moneyFormat } from '@shared/lib/format';
import userEvent from '@testing-library/user-event';

const ADD_TO_BASKET_TEXT_PATTERN = /добавить в корзину/gmi;
const PRODUCT_CARD_TEST_ID = 'basket-product-card';
const BUTTON_ICON_TEST_ID = 'add-to-basket-icon';

describe('component \'AddToBasketModalContent\'', () => {
  const onAddToBasketButtonClickMock = vi.fn();
  const fakeProduct = generateProductMock();

  beforeEach(() => {
    onAddToBasketButtonClickMock.mockReset();
  });

  it('should correct render', () => {
    const priceText = moneyFormat(fakeProduct.price);
    const screen = render(
      <AddToBasketModalContent
        onAddToBasketButtonClick={onAddToBasketButtonClickMock}
        product={fakeProduct}
      />
    );

    expect(screen.getByTestId(PRODUCT_CARD_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(ADD_TO_BASKET_TEXT_PATTERN)).toBeInTheDocument();
    expect(screen.getByTestId(BUTTON_ICON_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(priceText, {trim: false, collapseWhitespace: false})).toBeInTheDocument();
  });

  it('should call \'onAddToBasketButtonClick\' callback if button clicked', async () => {
    const screen = render(
      <AddToBasketModalContent
        onAddToBasketButtonClick={onAddToBasketButtonClickMock}
        product={fakeProduct}
      />
    );

    const addToBasketButtonElement = screen.getByText(ADD_TO_BASKET_TEXT_PATTERN);

    await userEvent.click(addToBasketButtonElement);

    expect(onAddToBasketButtonClickMock).toBeCalledTimes(1);
    expect(onAddToBasketButtonClickMock).lastCalledWith(fakeProduct.id);
  });
});
