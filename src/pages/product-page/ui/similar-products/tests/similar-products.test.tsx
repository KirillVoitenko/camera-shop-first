import { withRouter, withStore } from '@test-utills/wrappers';
import { render } from '@testing-library/react';
import { SwiperSlideProps, SwiperProps } from 'swiper/react';
import { SimilarProducts } from '../similar-products';
import { RootState } from '@shared/model/redux';
import { generateProductMock } from '@test-utills/mocks/product';
import faker from 'faker';

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

const FAKE_SWIPER_TEXT = 'FAKE SWIPER';
const FAKE_SWIPER_SLIDE_TEXT = 'FAKE SWIPER SLIDE';
const HEADER_TEXT = /похожие товары/gmi;
const ARROW_TEST_ID = 'swiper-arrow';
const PRODUCT_CARD_TEST_ID = 'short-product-card-container';

const ON_BUY_BUTTON_CLICK_MOCK = vi.fn();
const SIMILARS_LENGTH = faker.datatype.number({min: 3, max: 20});

const componentRender = () => {
  const initialState: Partial<RootState> = {
    product: {
      loading: false,
      product: generateProductMock(),
      comments: [],
      similarProducts: Array.from({length: SIMILARS_LENGTH}).map(generateProductMock)
    }
  };

  const { wrappedComponent } = withStore(withRouter(<SimilarProducts onBuyButtonClick={ON_BUY_BUTTON_CLICK_MOCK} />), initialState);
  return wrappedComponent;
};

describe('Component \'SimilarProducts\'', () => {
  it('should correct render', () => {
    const screen = render(componentRender());

    expect(screen.getByText(HEADER_TEXT)).toBeInTheDocument();
    expect(screen.getAllByTestId(ARROW_TEST_ID).length).toBe(2);
    expect(screen.getAllByTestId(PRODUCT_CARD_TEST_ID).length).toBe(SIMILARS_LENGTH);
    expect(screen.getByText(FAKE_SWIPER_TEXT)).toBeInTheDocument();
    expect(screen.getAllByText(FAKE_SWIPER_SLIDE_TEXT).length).toBe(SIMILARS_LENGTH);
  });
});
