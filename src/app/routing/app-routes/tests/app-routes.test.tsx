import { AppRoutesEnum } from '@shared/model/enums';
import { withRouter } from '@test-utills/wrappers';
import { render, screen, waitFor } from '@testing-library/react';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import { generatePath, Outlet } from 'react-router-dom';
import { AppRoutes } from '../app-routes';

const FAKE_MAIN_PAGE_TEXT = faker.lorem.paragraph();
const FAKE_PRODUCT_PAGE_TEXT = faker.lorem.paragraph();
const FAKE_404_PAGE_TEXT = faker.lorem.paragraph();
const FAKE_BASKET_PAGE_TEXT = faker.lorem.paragraph();

const INITIAL_ROUTE = '/initial-route';

const MainPageMock = () => <p>{FAKE_MAIN_PAGE_TEXT}</p>;
const ProductPageMock = () => <p>{FAKE_PRODUCT_PAGE_TEXT}</p>;
const NotFoundPageMock = () => <p>{FAKE_404_PAGE_TEXT}</p>;
const PageLayoutMock = () => <div><Outlet /></div>;
const BasketPageMock = () => <p>{FAKE_BASKET_PAGE_TEXT}</p>;

type EachArg = {
  pageName: string;
  pageRoute: string;
  expectedText: string;
}

describe('Component \'AppRoutes\'', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    history.replace(INITIAL_ROUTE);
  });

  it.each<EachArg>([
    { expectedText: FAKE_MAIN_PAGE_TEXT, pageName: 'MainPage', pageRoute: AppRoutesEnum.Main },
    { expectedText: FAKE_PRODUCT_PAGE_TEXT, pageName: 'ProductPage', pageRoute: generatePath(AppRoutesEnum.Product, { productId: String(faker.datatype.number()) }) },
    { expectedText: FAKE_404_PAGE_TEXT, pageName: 'NotFoundPage', pageRoute: AppRoutesEnum.NotFound },
    { expectedText: FAKE_BASKET_PAGE_TEXT, pageName: 'BasketPage', pageRoute: AppRoutesEnum.Basket }
  ])('should correct render by $pageName route', async ({ expectedText, pageRoute }) => {
    vi.spyOn(await import('@app/routing/page-layout'), 'PageLayout').mockImplementation(PageLayoutMock);
    vi.spyOn(await import('@pages/main-page'), 'default').mockImplementation(MainPageMock);
    vi.spyOn(await import('@pages/not-found-page'), 'default').mockImplementation(NotFoundPageMock);
    vi.spyOn(await import('@pages/product-page'), 'default').mockImplementation(ProductPageMock);
    vi.spyOn(await import('@pages/basket-page'), 'default').mockImplementation(BasketPageMock);
    history.push(pageRoute);

    render(withRouter(<AppRoutes />, history));

    await waitFor(() => {
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });
});
