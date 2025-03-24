import { render } from '@testing-library/react';
import { withStore } from '@test-utills/wrappers';
import { createMemoryHistory, MemoryHistory } from 'history';
import { PromosSlider } from '../promos-slider';
import { SwiperSlideProps, SwiperProps } from 'swiper/react';
import faker from 'faker';
import { PROMOS_COUNT } from '@pages/main-page/config/const';
import { generatePromoProductMock } from '@test-utills/mocks/product';
import { generatePath } from 'react-router-dom';
import { AppRoutesEnum } from '@shared/model/enums';
import userEvent from '@testing-library/user-event';

vi.mock('swiper/react', () => ({
  Swiper: ({children}: SwiperProps) => (
    <div>
      <p>FAKE SWIPER</p>
      {children}
    </div>
  ),
  SwiperSlide: ({children}: SwiperSlideProps) => (
    <div>
      <p>FAKE SWIPER SLIDE</p>
      {typeof children === 'function'
        ? children({isActive: true, isNext: true, isPrev: true, isVisible: true})
        : children}
    </div>
  )
}));

const FAKE_PROMOS_COUNT = Math.min(faker.datatype.number({min: 1, max: 10}), PROMOS_COUNT);
const FAKE_SWIPER_TEXT = 'FAKE SWIPER';
const FAKE_SWIPER_SLIDE_TEXT = 'FAKE SWIPER SLIDE';
const FAKE_PROMOS_PRODUCTS = Array.from({length: FAKE_PROMOS_COUNT}).map(generatePromoProductMock).sort((first, second) => first.id - second.id);
const PREVIEW_TEST_ID = 'preview-container';
const BANNER_MESSAGE = 'Новинка!';
const BANNER_TEXT = 'Профессиональная камера от известного производителя';

describe('Component \'PromosSlider\'', () => {
  const initialRoute = '/initial-route';
  const history: MemoryHistory = createMemoryHistory();

  beforeEach(() => {
    history.replace(initialRoute);
  });

  it('should correct render', () => {
    const { wrappedComponent } = withStore(
      <PromosSlider />,
      {
        products: {
          loading: false,
          products: [],
          promos: FAKE_PROMOS_PRODUCTS
        }
      },
      undefined,
      history
    );

    const screen = render(wrappedComponent);
    const promos = screen.getAllByTestId(PREVIEW_TEST_ID);

    expect(screen.getByText(FAKE_SWIPER_TEXT)).toBeInTheDocument();
    expect(screen.getAllByText(FAKE_SWIPER_SLIDE_TEXT).length).toBe(FAKE_PROMOS_COUNT);
    expect(promos.length).toBe(FAKE_PROMOS_COUNT);
    expect(screen.getAllByText(BANNER_MESSAGE).length).toBe(FAKE_PROMOS_COUNT);
    expect(screen.getAllByText(BANNER_TEXT).length).toBe(FAKE_PROMOS_COUNT);
  });

  it('slides links should correct works', async () => {
    const linkText = 'Подробнее';
    const { wrappedComponent } = withStore(
      <PromosSlider />,
      {
        products: {
          loading: false,
          products: [],
          promos: FAKE_PROMOS_PRODUCTS
        }
      },
      undefined,
      history
    );

    const screen = render(wrappedComponent);
    const linksElements = screen.getAllByText(linkText, {selector: 'a.btn'});

    for(let productIndex = 0; productIndex < FAKE_PROMOS_PRODUCTS.length; productIndex++) {
      const currentPromo = FAKE_PROMOS_PRODUCTS[productIndex];
      const promoLink = generatePath(AppRoutesEnum.Product, { productId: String(currentPromo.id) });

      await userEvent.click(linksElements[productIndex]);

      expect(history.location.pathname).toBe(promoLink);
    }
  });
});
