import { render } from '@testing-library/react';
import { BasketLink } from '../basket-link';
import { withStore } from '@test-utills/wrappers';
import { createMemoryHistory } from 'history';
import { BasketSliceState } from '@features/basket/model/basket-slice';
import faker from 'faker';
import { BasketItemShort } from '@features/basket/model/types';
import { AppRoutesEnum } from '@shared/model/enums';
import { BasketLinkTestId } from '@features/basket/config/const';
import userEvent from '@testing-library/user-event';

const INITIAL_ROUTE = '/initial-route';

type LinkClickEachArg = {
  linkName: string;
  route?: string;
}

const createBasketItems = (length: number): BasketItemShort[] => Array.from({ length }).map(() => ({
  count: faker.datatype.number(),
  productId: faker.datatype.number()
}));

const INITIAL_STATE: BasketSliceState = {
  basket: createBasketItems(faker.datatype.number({ max: 10, min: 2 })),
  loading: false,
  coupon: {
    data: {
      coupon: null,
      discountPercent: 0
    },
    status: 'success'
  }
};

const CUSTOM_ROUTE = '/custom-basket-route';

const POSITIONS_COUNT = INITIAL_STATE.basket.reduce((accum, current) => accum + current.count, 0);

describe('component \'BasketLink\'', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    history.replace(INITIAL_ROUTE);
  });

  it('should correct render with exists items in basket', () => {
    const { wrappedComponent } = withStore(
      <BasketLink />,
      {
        basket: INITIAL_STATE
      },
      undefined,
      history
    );

    const screen = render(wrappedComponent);

    expect(screen.getByText(POSITIONS_COUNT)).toBeInTheDocument();
    expect(screen.getByTestId(BasketLinkTestId.Link)).toBeInTheDocument();
    expect(screen.getByTestId(BasketLinkTestId.Icon)).toBeInTheDocument();
  });

  it('should correct render with not exists items in basket', () => {
    const { wrappedComponent } = withStore(
      <BasketLink />,
      {
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
      },
      undefined,
      history
    );

    const screen = render(wrappedComponent);

    expect(screen.queryByText(POSITIONS_COUNT)).toBeNull();
    expect(screen.getByTestId(BasketLinkTestId.Link)).toBeInTheDocument();
    expect(screen.getByTestId(BasketLinkTestId.Icon)).toBeInTheDocument();
  });

  it.each<LinkClickEachArg>([
    { linkName: 'default' },
    { linkName: 'custom', route: CUSTOM_ROUTE }
  ])('basket link click should navigate to $linkName route', async ({ route }) => {
    const { wrappedComponent } = withStore(
      <BasketLink link={route} />,
      {
        basket: INITIAL_STATE
      },
      undefined,
      history
    );

    const screen = render(wrappedComponent);
    const linkElement = screen.getByTestId(BasketLinkTestId.Link);

    await userEvent.click(linkElement);

    expect(history.location.pathname).toBe(route ?? AppRoutesEnum.Basket);
  });
});
