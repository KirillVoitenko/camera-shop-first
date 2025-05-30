import { render } from '@testing-library/react';
import { PageHeader } from '../page-header';
import { withRouter } from '@test-utills/wrappers';
import {
  PAGE_HEADER_TEST_ID,
  HEADER_NAVIGATION_TEST_ID,
  LOGO_TEST_ID
} from '@app/routing/page-layout/config/const';

vi.mock('@features/product-search', () => ({
  ProductSearch: vi.fn(() => <input placeholder='Поиск по сайту' />)
}));
vi.mock('@features/basket', () => ({
  BasketLink: vi.fn(() => <span>Корзина</span>)
}));

describe('Component \'PageHeader\'', () => {
  it('should correct render', () => {
    const screen = render(withRouter(<PageHeader />));

    expect(screen.getByTestId(PAGE_HEADER_TEST_ID)).toBeInTheDocument();
  });

  it('should render \'Logo\' component', () => {
    const screen = render(withRouter(<PageHeader />));

    expect(screen.getByTestId(LOGO_TEST_ID)).toBeInTheDocument();
  });

  it('should render \'HeaderNav\' component', () => {
    const screen = render(withRouter(<PageHeader />));

    expect(screen.getByTestId(HEADER_NAVIGATION_TEST_ID)).toBeInTheDocument();
  });

  it('should render \'ProductSearch\' component', () => {
    const searchPlaceholder = 'Поиск по сайту';
    const screen = render(withRouter(<PageHeader />));

    expect(screen.getByPlaceholderText(searchPlaceholder)).toBeInTheDocument();
  });

  it('should render \'BasketLink\' component', () => {
    const fakeBasketLinkPattern = /корзина/gmi;
    const screen = render(withRouter(<PageHeader />));

    expect(screen.getByText(fakeBasketLinkPattern)).toBeInTheDocument();
  });
});
