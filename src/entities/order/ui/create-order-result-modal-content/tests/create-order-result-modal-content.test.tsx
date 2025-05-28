import { OrderStatus } from '@entities/order/model/types';
import { CreateOrderResultModalContent } from '../create-order-result-modal-content';
import { render } from '@testing-library/react';
import faker from 'faker';
import userEvent from '@testing-library/user-event';

const ICON_TEST_ID = 'order-result-icon';
const TO_BASKET_TEXT_PATTERN = /в корзину/gmi;
const TO_PRODUCT_LIST_TEXT_PATTERN = /вернуться к покупкам/gmi;

const FAKE_ERROR_STATUS: OrderStatus = {
  status: 'error',
  resolution: faker.lorem.sentence()
};

type CallbackClickEachArg = {
  callback: () => void;
  callbackName: string;
  buttonSearchPattern: RegExp;
  buttonName: 'toBasket' | 'toProductList';
}

describe('component \'CreateOrderResultModalContent\'', () => {
  const onToBasketClickMock = vi.fn();
  const onToProductListClickMock = vi.fn();

  it('should correct render by status \'success\'', () => {
    const status: OrderStatus = {
      status: 'success'
    };

    const screen = render(<CreateOrderResultModalContent onToBasketClick={onToBasketClickMock} onToProductListClick={onToProductListClickMock} status={status}/>);

    expect(screen.getByTestId(ICON_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(TO_PRODUCT_LIST_TEXT_PATTERN)).toBeInTheDocument();
    expect(screen.queryByText(TO_BASKET_TEXT_PATTERN)).toBeNull();
  });

  it('should correct render by status \'error\'', () => {
    const screen = render(<CreateOrderResultModalContent onToBasketClick={onToBasketClickMock} onToProductListClick={onToProductListClickMock} status={FAKE_ERROR_STATUS}/>);

    expect(screen.getByTestId(ICON_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(TO_PRODUCT_LIST_TEXT_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(TO_BASKET_TEXT_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(FAKE_ERROR_STATUS.resolution)).toBeInTheDocument();
  });

  it.each<CallbackClickEachArg>([
    { buttonSearchPattern: TO_BASKET_TEXT_PATTERN, callback: onToBasketClickMock, callbackName: 'onToBasketClick', buttonName: 'toBasket' },
    { buttonSearchPattern: TO_PRODUCT_LIST_TEXT_PATTERN, callback: onToProductListClickMock, callbackName: 'onToProductListClick', buttonName: 'toProductList' },
  ])('sould call $callbackName callback if $buttonName button clicked', async ({callback, buttonSearchPattern}) => {
    const screen = render(<CreateOrderResultModalContent onToBasketClick={onToBasketClickMock} onToProductListClick={onToProductListClickMock} status={FAKE_ERROR_STATUS}/>);

    const buttonElement = screen.getByText(buttonSearchPattern);

    await userEvent.click(buttonElement);

    expect(callback).toBeCalledTimes(1);
  });
});
