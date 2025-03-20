import { moneyFormat } from '@shared/lib/format';
import { ShortProductCard } from '../short-product-card';
import { generateProductMock } from '@test-utills/mocks/product';
import { withRouter } from '@test-utills/wrappers';
import { render } from '@testing-library/react';
import { SHORT_PRODUCT_CARD_TEST_ID, BUY_BUTTON_TEST_ID } from '@entities/product/config/const';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, MemoryHistory } from 'history';
import { generatePath } from 'react-router-dom';
import { AppRoutesEnum } from '@shared/model/enums';

const PRODUCT_MOCK = generateProductMock();
const buyButtonClickHandlerMock = vi.fn();
const PREVIEW_TEST_ID = 'preview-container';
const RATE_INFO_TEST_ID = 'rate-container';
const MORE_INFO_LINK_TEXT = 'Подробнее';

describe('Component \'ShortProductCard\'', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
    buyButtonClickHandlerMock.mockReset();
  });

  it('should correct render', () => {
    const screen = render(withRouter(<ShortProductCard onBuyButtonClick={buyButtonClickHandlerMock} product={PRODUCT_MOCK}/>));
    const expectedPrice = moneyFormat(PRODUCT_MOCK.price);

    expect(screen.getByTestId(SHORT_PRODUCT_CARD_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PREVIEW_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(RATE_INFO_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(PRODUCT_MOCK.name)).toBeInTheDocument();
    expect(screen.getByTestId(BUY_BUTTON_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(expectedPrice, {trim: false, collapseWhitespace: false})).toBeInTheDocument();
    expect(screen.getByText(MORE_INFO_LINK_TEXT)).toBeInTheDocument();
  });

  it('should call \'onBuyButtonClick\' callback with buy button click', async () => {
    const screen = render(withRouter(<ShortProductCard onBuyButtonClick={buyButtonClickHandlerMock} product={PRODUCT_MOCK}/>));

    await userEvent.click(
      screen.getByTestId(BUY_BUTTON_TEST_ID)
    );

    expect(buyButtonClickHandlerMock).toBeCalledTimes(1);
  });

  it('should navigate into product page by more info link click', async () => {
    const screen = render(withRouter(<ShortProductCard onBuyButtonClick={buyButtonClickHandlerMock} product={PRODUCT_MOCK}/>, history));
    const expectedUrl = generatePath(AppRoutesEnum.Product, {productId: String(PRODUCT_MOCK.id)});

    await userEvent.click(
      screen.getByText(MORE_INFO_LINK_TEXT)
    );

    expect(history.location.pathname).toBe(`/${expectedUrl}`);
  });
});
