import { render, waitFor, screen } from '@testing-library/react';
import { withStore, withRouter, withHelmet } from '@test-utills/wrappers';
import { generateProductMock } from '@test-utills/mocks/product';
import { RootState } from '@shared/model/redux';
import { generateCommentMock } from '@test-utills/mocks/comment';
import faker from 'faker';
import { ProductPageWithTitle as ProductPage } from '../product-page';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchProductActionReturn } from '@pages/product-page/model/product-slice/actions';
import { isActionsEquals } from '@test-utills/mocks/redux';
import { intersectionObserverMock } from '@test-utills/mocks/system-modules';

const PRODUCT_MOCK = generateProductMock();

const COMMENTS_LENGTH = faker.datatype.number({ max: 10, min: 3 });
const SIMILARS_LENGTH = faker.datatype.number({ max: 10, min: 3 });

const PRODUCT_STATE_MOCK = {
  comments: Array.from({ length: COMMENTS_LENGTH }).map(generateCommentMock),
  loading: false,
  product: PRODUCT_MOCK,
  similarProducts: Array.from({ length: SIMILARS_LENGTH }).map(generateProductMock),
};

const INITIAL_STATE: Partial<RootState> = {
  product: PRODUCT_STATE_MOCK,
  basket: {
    basket: [],
    loading: false,
  }
};

const FETCH_PRODUCT_ACTION_MOCK = createAsyncThunk<FetchProductActionReturn, { cameraId: number }>(
  'mock/fetchProduct',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_): Promise<FetchProductActionReturn> => Promise.resolve(PRODUCT_STATE_MOCK)
);

const FULL_PRODUCT_CARD_TEST_ID = 'full-product-card-container';
const SIMILARS_TEST_ID = 'similar-products';
const COMMENTS_TEST_ID = 'reviews-list-container';

const componentRender = () => {
  const { store, wrappedComponent } = withStore(withRouter(withHelmet(<ProductPage />)), INITIAL_STATE);

  return {
    store,
    wrappedComponent
  };
};

describe('Component \'ProductPage\'', () => {
  beforeAll(() => {
    window.IntersectionObserver = intersectionObserverMock;
  });

  it('should correct render', async () => {
    vi.spyOn(await import('@pages/product-page/model/product-slice'), 'fetchProductAction').mockImplementation(FETCH_PRODUCT_ACTION_MOCK);
    const { store, wrappedComponent } = componentRender();

    render(wrappedComponent);

    await waitFor(() => {
      expect(isActionsEquals(store.getActions(), [FETCH_PRODUCT_ACTION_MOCK.pending, FETCH_PRODUCT_ACTION_MOCK.fulfilled])).toBeTruthy();
      expect(screen.getByTestId(FULL_PRODUCT_CARD_TEST_ID)).toBeInTheDocument();
      expect(screen.getByTestId(SIMILARS_TEST_ID)).toBeInTheDocument();
      expect(screen.getByTestId(COMMENTS_TEST_ID)).toBeInTheDocument();
    });
  });
});
