import { render } from '@testing-library/react';
import { withRouter } from '@test-utills/wrappers';
import { createMemoryHistory } from 'history';
import faker from 'faker';
import { generateProductMock } from '@test-utills/mocks/product';
import { SearchResult } from '../search-result';
import { SearchTestId } from '@features/product-search/config/const';
import userEvent from '@testing-library/user-event';
import { generatePath } from 'react-router-dom';
import { AppRoutesEnum } from '@shared/model/enums';

const INITIAL_ROUTE = '/initial-route';

const SEARCHED_PRODUCTS_LENGTH = faker.datatype.number({max: 10, min: 1});
const SEARCHED_PRODUCTS_MOCK = Array.from({length: SEARCHED_PRODUCTS_LENGTH}).map(generateProductMock);

describe('Component \'SearchResult\'', () => {
  const history = createMemoryHistory();
  const onSearchResetMock = vi.fn();

  beforeEach(() => {
    history.replace(INITIAL_ROUTE);
    onSearchResetMock.mockReset();
  });

  it('should correct render if \'items\' prop not empty', () => {
    const screen = render(withRouter(<SearchResult activeItemIndex={0} items={SEARCHED_PRODUCTS_MOCK} onSearchReset={onSearchResetMock}/>));

    expect(screen.getByTestId(SearchTestId.List)).toBeInTheDocument();
    expect(screen.getAllByTestId(SearchTestId.ListItem).length).toBe(SEARCHED_PRODUCTS_LENGTH);
  });

  it('should correct render if \'items\' prop empty', () => {
    const screen = render(withRouter(<SearchResult activeItemIndex={0} items={[]} onSearchReset={onSearchResetMock}/>));
    const emptySearchResultPattern = /нет результатов/igm;

    expect(screen.getByTestId(SearchTestId.List)).toBeInTheDocument();
    expect(screen.queryAllByTestId(SearchTestId.ListItem).length).toBe(0);
    expect(screen.getByText(emptySearchResultPattern)).toBeInTheDocument();
  });

  it('item click should correct works', async () => {
    const screen = render(withRouter(<SearchResult activeItemIndex={0} items={SEARCHED_PRODUCTS_MOCK} onSearchReset={onSearchResetMock}/>, history));
    const searchItems = screen.getAllByTestId(SearchTestId.ListItem);

    for (let productIndex = 0; productIndex < searchItems.length; productIndex++) {
      const currentProduct = SEARCHED_PRODUCTS_MOCK[productIndex];
      const expectedUrl = generatePath(AppRoutesEnum.Product, {productId: String(currentProduct.id)});
      const currentItem = searchItems[productIndex].querySelector('a');
      onSearchResetMock.mockReset();
      history.replace(INITIAL_ROUTE);

      if (currentItem) {
        await userEvent.click(currentItem);
        expect(onSearchResetMock).toBeCalled();
        expect(history.location.pathname).toBe(expectedUrl);
        continue;
      }

      throw new Error('item link not found');
    }
  });
});
