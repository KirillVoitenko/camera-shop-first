import { render } from '@testing-library/react';
import { CallItemModalContent } from '../call-item-modal-content';
import { generateProductMock } from '@test-utills/mocks/product';
import userEvent from '@testing-library/user-event';

const ON_CREATE_ORDER_MOCK = vi.fn();
const PHONE_INPUT_PLACEHOLDER = 'Введите ваш номер';
const PRODUCT_CARD_TEST_ID = 'basket-product-card';
const PRODUCT_MOCK = generateProductMock();
const SUBMIT_BUTTON_TEXT = 'Заказать';
const INVALID_PHONE_ERROR = 'Неверный формат телефона';
const INVALID_PHONE = '32133';
const VALID_PHONE_INPUT = '9999999999';

describe('Component \'CallItemModalContent\'', () => {
  beforeEach(() => {
    ON_CREATE_ORDER_MOCK.mockReset();
  });

  it('should correct render', () => {
    const screen = render(<CallItemModalContent onCreateOrder={ON_CREATE_ORDER_MOCK} product={PRODUCT_MOCK}/>);

    expect(screen.getByTestId(PRODUCT_CARD_TEST_ID)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(PHONE_INPUT_PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByText(SUBMIT_BUTTON_TEXT)).toBeInTheDocument();
  });

  it('should render validation errors', async () => {
    const screen = render(<CallItemModalContent onCreateOrder={ON_CREATE_ORDER_MOCK} product={PRODUCT_MOCK}/>);

    await userEvent.type(screen.getByPlaceholderText(PHONE_INPUT_PLACEHOLDER), INVALID_PHONE);
    await userEvent.tab();

    expect(screen.getByText(INVALID_PHONE_ERROR)).toBeInTheDocument();
  });

  it('should submit if form valid', async () => {
    const screen = render(<CallItemModalContent onCreateOrder={ON_CREATE_ORDER_MOCK} product={PRODUCT_MOCK}/>);

    await userEvent.type(screen.getByPlaceholderText(PHONE_INPUT_PLACEHOLDER), VALID_PHONE_INPUT);
    await userEvent.click(screen.getByText(SUBMIT_BUTTON_TEXT));

    expect(ON_CREATE_ORDER_MOCK).toBeCalledTimes(1);
  });

  it('should not submit if form not valid', async () => {
    const screen = render(<CallItemModalContent onCreateOrder={ON_CREATE_ORDER_MOCK} product={PRODUCT_MOCK}/>);

    await userEvent.type(screen.getByPlaceholderText(PHONE_INPUT_PLACEHOLDER), INVALID_PHONE);
    await userEvent.click(screen.getByText(SUBMIT_BUTTON_TEXT));

    expect(ON_CREATE_ORDER_MOCK).not.toBeCalled();
  });
});
