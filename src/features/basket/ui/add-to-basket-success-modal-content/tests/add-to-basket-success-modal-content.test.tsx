import { render } from '@testing-library/react';
import { AddToBasketSuccessModalContent } from '../add-to-basket-success-modal-content';
import { beforeEach } from 'vitest';
import { withRouter } from '@test-utills/wrappers';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { AppRoutesEnum } from '@shared/model/enums';

type OnActionClickEachArg = {
  buttonText: RegExp;
  buttonName: string;
}

const TITLE_PATTERN = /товар успешно добавлен в корзину/gmi;
const RETURN_BUTTON_TEXT_PATTERN = /продолжить покупки/gmi;
const TO_BASKET_LINK_TEXT_PATTERN = /перейти в корзину/gmi;
const ICON_TEST_ID = 'add-success-icon';
const INIT_ROUTE = '/init-route';

describe('component \'AddToBasketSuccessModalContent\'', () => {
  const onActionClickMock = vi.fn();
  const history = createMemoryHistory();

  beforeEach(() => {
    onActionClickMock.mockReset();
    history.replace(INIT_ROUTE);
  });

  it('should correct render', () => {
    const screen = render(
      withRouter(
        <AddToBasketSuccessModalContent onActionClick={onActionClickMock}/>,
        history
      )
    );

    expect(screen.getByTestId(ICON_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(TITLE_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(RETURN_BUTTON_TEXT_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(TO_BASKET_LINK_TEXT_PATTERN)).toBeInTheDocument();
  });

  it.each<OnActionClickEachArg>([
    { buttonText: RETURN_BUTTON_TEXT_PATTERN, buttonName: 'returnButton' },
    { buttonText: TO_BASKET_LINK_TEXT_PATTERN, buttonName: 'toBasketLink' }
  ])('should call \'onActionClick\' callback if button $buttonName clicked', async ({ buttonText }) => {
    const screen = render(
      withRouter(
        <AddToBasketSuccessModalContent onActionClick={onActionClickMock}/>,
        history
      )
    );
    const buttonElement = screen.getByText(buttonText);

    await userEvent.click(buttonElement);

    expect(onActionClickMock).toBeCalledTimes(1);
  });

  it('should navigate to basket if to basket link clicked', async () => {
    const screen = render(
      withRouter(
        <AddToBasketSuccessModalContent onActionClick={onActionClickMock}/>,
        history
      )
    );
    const buttonElement = screen.getByText(TO_BASKET_LINK_TEXT_PATTERN);

    await userEvent.click(buttonElement);

    expect(history.location.pathname).toBe(AppRoutesEnum.Basket);
  });
});
