import { render } from '@testing-library/react';
import { BasketPromo } from '../basket-promo';
import faker from 'faker';
import userEvent from '@testing-library/user-event';
import { withStore } from '@test-utills/wrappers';
import { RootState } from '@shared/model/redux';
import { ServerRoutesEnum } from '@shared/model/enums';
import { AppliedCoupon } from '@features/basket/model/types';
import { PublicCoupon } from '@entities/order';

const TITLE_TEXT_PATTERN = /если у вас есть промокод на скидку, примените его в этом поле/gmi;
const PROMO_INPUT_PLACEHOLDER = /введите промокод/gmi;
const SUBMIT_BUTTON_TEXT = /применить/gmi;
const SUCCESS_STATUS_PATTERN = /промокод принят/gmi;
const ERROR_STATUS_PATTERN = /промокод неверный/gmi;

const BASKET_INITIAL_STATE: RootState['basket'] = {
  basket: [{
    productId: faker.datatype.number(),
    count: faker.datatype.number()
  }],
  coupon: {
    status: 'success',
    data: {
      coupon: null,
      discountPercent: 0
    }
  },
  loading: false
};

describe('component \'BasketPromo\'', () => {
  it('should correct render', () => {
    const { wrappedComponent } = withStore(<BasketPromo />, {
      basket: BASKET_INITIAL_STATE
    });
    const screen = render(wrappedComponent);

    expect(screen.getByText(TITLE_TEXT_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(SUBMIT_BUTTON_TEXT)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(PROMO_INPUT_PLACEHOLDER));
  });

  it('should support user interrupt', async () => {
    const inputText = faker.lorem.word();
    const { wrappedComponent } = withStore(<BasketPromo />, {
      basket: BASKET_INITIAL_STATE
    });
    const screen = render(wrappedComponent);

    const inputElement = screen.getByPlaceholderText(PROMO_INPUT_PLACEHOLDER);

    await userEvent.type(inputElement, inputText);

    expect(screen.getByDisplayValue(inputText)).toBeInTheDocument();
  });

  it('should correct render with apply promo success', async () => {
    const inputText: PublicCoupon = 'camera-333';
    const {
      wrappedComponent,
      axiosAdapter
    } = withStore(<BasketPromo />, {
      basket: {
        ...BASKET_INITIAL_STATE,
        coupon: {
          data: {
            coupon: 'camera-333',
            discountPercent: faker.datatype.number({min: 1, max: 50})
          },
          status: 'success'
        }
      }
    });
    const screen = render(wrappedComponent);

    axiosAdapter.onPost(ServerRoutesEnum.Coupons).reply<AppliedCoupon>(200, {
      coupon: inputText as PublicCoupon,
      discountPercent: faker.datatype.number({min: 1, max: 50})}
    );

    const inputElement = screen.getByPlaceholderText(PROMO_INPUT_PLACEHOLDER);
    const submitElement = screen.getByText(SUBMIT_BUTTON_TEXT);

    await userEvent.type(inputElement, inputText);
    await userEvent.click(submitElement);

    expect(screen.getByText(SUCCESS_STATUS_PATTERN)).toBeInTheDocument();
    expect(screen.queryByText(ERROR_STATUS_PATTERN)).toBeNull();
  });

  it('should correct render with apply promo failed', async () => {
    const inputText = faker.lorem.word();
    const {
      wrappedComponent,
      axiosAdapter
    } = withStore(<BasketPromo />, {
      basket: {
        ...BASKET_INITIAL_STATE,
        coupon: {
          data: null,
          status: 'error'
        }
      }
    });
    const screen = render(wrappedComponent);

    axiosAdapter.onPost(ServerRoutesEnum.Coupons).reply<AppliedCoupon>(200, {
      coupon: inputText as PublicCoupon,
      discountPercent: faker.datatype.number({min: 1, max: 50})}
    );

    const inputElement = screen.getByPlaceholderText(PROMO_INPUT_PLACEHOLDER);
    const submitElement = screen.getByText(SUBMIT_BUTTON_TEXT);

    await userEvent.type(inputElement, inputText);
    await userEvent.click(submitElement);

    expect(screen.getByText(ERROR_STATUS_PATTERN)).toBeInTheDocument();
    expect(screen.queryByText(SUCCESS_STATUS_PATTERN)).toBeNull();
  });
});
