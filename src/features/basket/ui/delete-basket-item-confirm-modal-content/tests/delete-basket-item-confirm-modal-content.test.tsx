import { render } from '@testing-library/react';
import { DeleteBasketItemConfirmModalContent } from '../delete-basket-item-confirm-modal-content';
import { generateProductMock } from '@test-utills/mocks/product';
import userEvent from '@testing-library/user-event';

const DELETE_BUTTON_TEXT_PATTERN = /удалить/gmi;
const ESCAPE_BUTTON_TEXT_PATTERN = /продолжить покупки/gmi;
const PRODUCT_CARD_TEST_ID = 'basket-product-card';
const MODAL_TITLE_PATTERN = /удалить этот товар/gmi;

describe('component \'DeleteBasketItemConfirmModalContent\'', () => {
  const deleteConfirmHandlerMock = vi.fn();
  const deleteEscapeHandlerMock = vi.fn();
  const productMock = generateProductMock();

  beforeEach(() => {
    deleteConfirmHandlerMock.mockReset();
    deleteEscapeHandlerMock.mockReset();
  });

  it('should correct render', () => {
    const screen = render(
      <DeleteBasketItemConfirmModalContent
        onConfirmDeleting={deleteConfirmHandlerMock}
        onEscapeDeleting={deleteEscapeHandlerMock}
        product={productMock}
      />
    );

    expect(screen.getByText(MODAL_TITLE_PATTERN, {selector: 'p.title'})).toBeInTheDocument();
    expect(screen.getByTestId(PRODUCT_CARD_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(DELETE_BUTTON_TEXT_PATTERN, {selector: 'button'})).toBeInTheDocument();
    expect(screen.getByText(ESCAPE_BUTTON_TEXT_PATTERN, {selector: 'button'})).toBeInTheDocument();
  });

  it('should call \'onConfirmDeleting\' by confirm button click', async () => {
    const screen = render(
      <DeleteBasketItemConfirmModalContent
        onConfirmDeleting={deleteConfirmHandlerMock}
        onEscapeDeleting={deleteEscapeHandlerMock}
        product={productMock}
      />
    );

    const buttonElement = screen.getByText(DELETE_BUTTON_TEXT_PATTERN, {selector: 'button'});

    await userEvent.click(buttonElement);

    expect(deleteConfirmHandlerMock).toBeCalledTimes(1);
  });

  it('should call \'onEscapeDeleting\' by escape button click', async () => {
    const screen = render(
      <DeleteBasketItemConfirmModalContent
        onConfirmDeleting={deleteConfirmHandlerMock}
        onEscapeDeleting={deleteEscapeHandlerMock}
        product={productMock}
      />
    );

    const buttonElement = screen.getByText(ESCAPE_BUTTON_TEXT_PATTERN, {selector: 'button'});

    await userEvent.click(buttonElement);

    expect(deleteEscapeHandlerMock).toBeCalledTimes(1);
  });
});
