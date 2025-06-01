import { render } from '@testing-library/react';
import { withStore } from '@test-utills/wrappers';
import { CommentsList } from '../comments-list';
import {
  REVIEWS_EMPTY_SECTION_TEST_ID,
  REVIEWS_LIST_TEST_ID,
  COMMENTS_IN_ONE_PRINT
} from '@pages/product-page/config/const';
import { generateCommentMock } from '@test-utills/mocks/comment';
import faker from 'faker';
import userEvent from '@testing-library/user-event';
import { intersectionObserverMock } from '@test-utills/mocks/system-modules';
import { createMemoryHistory } from 'history';

const SHOW_MORE_BUTTON_PATTERN = /показать больше отзывов/gi;
const COMMENT_CARD_TEST_ID = 'comment-card-container';

vi.mock('IntersectionObserver');

const FAKE_PRODUCT_ID = faker.datatype.number();

describe('Component \'CommentsList\'', () => {
  const initialRoute = '/init-route';
  const history = createMemoryHistory();

  beforeAll(() => {
    window.IntersectionObserver = intersectionObserverMock;
  });

  beforeEach(() => {
    history.replace(initialRoute);
  });

  it('should correct render by 0 comments', () => {
    const { wrappedComponent } = withStore(
      <CommentsList productId={FAKE_PRODUCT_ID} />,
      {
        product: {
          comments: [],
          loading: false,
          product: null,
          similarProducts: []
        }
      },
      [],
      history
    );

    const screen = render(wrappedComponent);

    expect(screen.getByTestId(REVIEWS_EMPTY_SECTION_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(REVIEWS_LIST_TEST_ID)).toBeNull();
  });

  it(`should correct render by comments count <= ${COMMENTS_IN_ONE_PRINT}`, () => {
    const { wrappedComponent } = withStore(
      <CommentsList productId={FAKE_PRODUCT_ID} />,
      {
        product: {
          comments: Array.from({length: COMMENTS_IN_ONE_PRINT}).map(() => generateCommentMock()),
          loading: false,
          product: null,
          similarProducts: []
        }
      },
      [],
      history
    );

    const screen = render(wrappedComponent);

    expect(screen.queryByTestId(REVIEWS_EMPTY_SECTION_TEST_ID)).toBeNull();
    expect(screen.queryByTestId(SHOW_MORE_BUTTON_PATTERN)).toBeNull();
    expect(screen.getByTestId(REVIEWS_LIST_TEST_ID)).toBeInTheDocument();
    expect(screen.getAllByTestId(COMMENT_CARD_TEST_ID).length).toBe(COMMENTS_IN_ONE_PRINT);
  });

  it(`should correct render by comments count >= ${COMMENTS_IN_ONE_PRINT}`, async () => {
    const commentsMock = Array.from({length: faker.datatype.number({min: COMMENTS_IN_ONE_PRINT + 1, max: COMMENTS_IN_ONE_PRINT + 30})}).map(() => generateCommentMock());
    const { wrappedComponent } = withStore(
      <CommentsList productId={FAKE_PRODUCT_ID} />,
      {
        product: {
          comments: commentsMock,
          loading: false,
          product: null,
          similarProducts: []
        }
      },
      [],
      history
    );

    const screen = render(wrappedComponent);

    expect(screen.getByText(SHOW_MORE_BUTTON_PATTERN)).toBeInTheDocument();
    expect(screen.getByTestId(REVIEWS_LIST_TEST_ID)).toBeInTheDocument();
    expect(screen.getAllByTestId(COMMENT_CARD_TEST_ID).length).toBe(COMMENTS_IN_ONE_PRINT);

    await userEvent.click(screen.getByText(SHOW_MORE_BUTTON_PATTERN));

    expect(screen.getAllByTestId(COMMENT_CARD_TEST_ID).length).toBe(Math.min(2 * COMMENTS_IN_ONE_PRINT, commentsMock.length));
  });
});
