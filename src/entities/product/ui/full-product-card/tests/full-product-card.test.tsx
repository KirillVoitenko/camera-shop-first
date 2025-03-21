import { render } from '@testing-library/react';
import { generateProductMock } from '@test-utills/mocks/product';
import { FullProductCard } from '../full-product-card';
import { BUY_BUTTON_TEST_ID, FULL_PRODUCT_CARD_TEST_ID } from '@entities/product/config/const';
import { withRouter } from '@test-utills/wrappers';
import { moneyFormat } from '@shared/lib/format';
import userEvent from '@testing-library/user-event';

const PREVIEW_COMPONENT_TEST_ID = 'preview-container';
const TABS_COMPONENT_TEST_ID = 'product-tabs-container';
const ON_BUY_BUTTON_CLICK_MOCK = vi.fn();

describe('Component \'FullProductCard\'', () => {
  const productMock = generateProductMock();

  beforeEach(() => {
    ON_BUY_BUTTON_CLICK_MOCK.mockReset();
  });

  it('should correct render', () => {
    const screen = render(withRouter(<FullProductCard product={productMock} onBuyButtonClick={ON_BUY_BUTTON_CLICK_MOCK}/>));

    expect(screen.getByTestId(FULL_PRODUCT_CARD_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(productMock.name)).toBeInTheDocument();
    expect(screen.getByText(moneyFormat(productMock.price), {trim: false, collapseWhitespace: false})).toBeInTheDocument();
    expect(screen.getByTestId(PREVIEW_COMPONENT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(TABS_COMPONENT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(BUY_BUTTON_TEST_ID)).toBeInTheDocument();
  });

  it('should call \'onBuyButtonClick\' callback by click in buy button', async () => {
    const screen = render(withRouter(<FullProductCard product={productMock} onBuyButtonClick={ON_BUY_BUTTON_CLICK_MOCK}/>));

    await userEvent.click(screen.getByTestId(BUY_BUTTON_TEST_ID));

    expect(ON_BUY_BUTTON_CLICK_MOCK).toBeCalledTimes(1);
  });
});
