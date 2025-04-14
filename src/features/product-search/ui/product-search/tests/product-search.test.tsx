import { ProductSearch } from '../product-search';
import { render } from '@testing-library/react';
import { withStore } from '@test-utills/wrappers';
import { RootState } from '@shared/model/redux';
import faker from 'faker';
import { generateProductMock } from '@test-utills/mocks/product';
import { SearchTestId } from '@features/product-search/config/const';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

const PRODUCTS_COUNT = faker.datatype.number({min: 1, max: 20});
const PLACEHOLDER_PATTERN = /поиск по сайту/igm;

const STATE_MOCK: Partial<RootState> = {
  products: {
    loading: false,
    products: Array.from({length: PRODUCTS_COUNT}).map(generateProductMock),
    promos: []
  }
};

describe('Component \'ProductSearch\'', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    history.replace('/initial-route');
  });

  it('should correct render', () => {
    const { wrappedComponent } = withStore(<ProductSearch />, STATE_MOCK, [], history);
    const screen = render(wrappedComponent);

    expect(screen.getByPlaceholderText(PLACEHOLDER_PATTERN)).toBeInTheDocument();
    expect(screen.queryAllByTestId(SearchTestId.ListItem).length).toBe(0);
  });

  it('should support user input', async () => {
    const inputString = faker.lorem.word();
    const { wrappedComponent } = withStore(<ProductSearch />, STATE_MOCK, [], history);
    const screen = render(wrappedComponent);

    await userEvent.type(
      screen.getByPlaceholderText(PLACEHOLDER_PATTERN),
      inputString
    );

    expect(screen.getByDisplayValue(inputString)).toBeInTheDocument();
  });

  it('should render filtered products list', async () => {
    const inputString = STATE_MOCK.products?.products[0]?.name ?? '';
    const { wrappedComponent } = withStore(<ProductSearch />, STATE_MOCK, [], history);
    const screen = render(wrappedComponent);
    const expectedCount = (STATE_MOCK.products?.products ?? []).filter((current) => current.name.toLowerCase().includes(inputString.toLowerCase())).length;

    await userEvent.type(
      screen.getByPlaceholderText(PLACEHOLDER_PATTERN),
      inputString
    );

    expect(screen.getByDisplayValue(inputString)).toBeInTheDocument();
    expect(screen.getAllByTestId(SearchTestId.ListItem).length).toBe(expectedCount);
  });
});
