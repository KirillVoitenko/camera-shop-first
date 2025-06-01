import { render } from '@testing-library/react';
import { withRouter, withStore, withHelmet } from '@test-utills/wrappers';
import { RootState } from '@shared/model/redux';
import { generateProductMock, generatePromoProductMock } from '@test-utills/mocks/product';
import faker from 'faker';
import { MainPageWithTitle as MainPage } from '../main-page';

const INITIAL_STATE: Partial<RootState> = {
  products: {
    loading: false,
    products: Array.from({ length: faker.datatype.number({ max: 10, min: 3 }) }).map(() => generateProductMock()),
    promos: Array.from({ length: faker.datatype.number({ max: 10, min: 3 }) }).map(() => generatePromoProductMock()),
  },
  basket: {
    basket: [],
    loading: false,
    coupon: {
      data: {
        coupon: null,
        discountPercent: 0
      },
      status: 'success'
    }
  }
};

const LAYOUT_CONTENT_TEST_ID = 'layout-content';
const PRODUCT_LIST_TEST_ID = 'products-list-container';
const FAKE_PROMOS_SLIDER_TEXT = faker.lorem.sentence();

const componentRender = () => {
  const { wrappedComponent } = withStore(withRouter(withHelmet(<MainPage />)), INITIAL_STATE);
  return wrappedComponent;
};

describe('Component \'MainPage\'', () => {
  it('should correct render', async () => {
    vi.spyOn(await import('../../promos-slider'), 'PromosSlider').mockImplementation(vi.fn(() => <p>{FAKE_PROMOS_SLIDER_TEXT}</p>));
    const screen = render(componentRender());

    expect(screen.getByTestId(LAYOUT_CONTENT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PRODUCT_LIST_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(FAKE_PROMOS_SLIDER_TEXT)).toBeInTheDocument();
  });
});
