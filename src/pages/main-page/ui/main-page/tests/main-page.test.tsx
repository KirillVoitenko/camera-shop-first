import { render } from '@testing-library/react';
import { withRouter, withStore, withHelmet } from '@test-utills/wrappers';
import { RootState } from '@shared/model/redux';
import { generateProductMock } from '@test-utills/mocks/product';
import faker from 'faker';
import { MainPageWithTitle as MainPage } from '../main-page';
import { BANNER_TEST_ID } from '@pages/main-page/config/const';

const INITIAL_STATE: Partial<RootState> = {
  products: {
    loading: false,
    products: Array.from({length: faker.datatype.number({max: 10, min: 3})}).map(() => generateProductMock())
  }
};

const LAYOUT_CONTENT_TEST_ID = 'layout-content';
const PRODUCT_LIST_TEST_ID = 'products-list-container';

const componentRender = () => {
  const { wrappedComponent } = withStore(withRouter(withHelmet(<MainPage />)), INITIAL_STATE);
  return wrappedComponent;
};

describe('Component \'MainPage\'', () => {

  it('should correct render', () => {
    const screen = render(componentRender());

    expect(screen.getByTestId(LAYOUT_CONTENT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(BANNER_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PRODUCT_LIST_TEST_ID)).toBeInTheDocument();
  });
});
