import { productSimilarsSelector } from '@pages/product-page/model/product-slice';
import { useAppSelector } from '@shared/lib/store';
import { CSSProperties, JSX, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product, ShortProductCard } from '@entities/product';
import { Navigation } from 'swiper/modules';
import { Arrow } from './arrow';

const PRODUCT_CARD_STYLES: CSSProperties = {
  margin: 0,
  width: '65%'
};

const SLIDES_COUNT = 3;

type SimilarProductsProps = {
  onBuyButtonClick: (product: Product) => void;
}

export function SimilarProducts({ onBuyButtonClick }: SimilarProductsProps): JSX.Element {
  const products = useAppSelector(productSimilarsSelector);

  const nextSlideButtonRef = useRef<HTMLButtonElement>(null);
  const prevSlideButtonRef = useRef<HTMLButtonElement>(null);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {products.length > 0 && (
        <div className='page-content__section' data-testid='similar-products'>
          <section className='product-similar'>
            <div className='container'>
              <h2 className='title title--h3'>
                Похожие товары
              </h2>
              <Swiper
                slidesPerView={SLIDES_COUNT}
                slidesPerGroup={SLIDES_COUNT}
                spaceBetween='-7.7%'
                className='product-similar__slider'
                wrapperClass='product-similar__slider-list'
                navigation={{
                  nextEl: nextSlideButtonRef.current,
                  prevEl: prevSlideButtonRef.current
                }}
                modules={[Navigation]}
              >
                {products.map((current) => (
                  <SwiperSlide key={current.id}>
                    <ShortProductCard
                      style={PRODUCT_CARD_STYLES}
                      className='is-active'
                      product={current}
                      onBuyButtonClick={onBuyButtonClick}
                    />
                  </SwiperSlide>
                ))}
                <Arrow
                  type='previous'
                  ref={prevSlideButtonRef}
                />
                <Arrow
                  type='next'
                  ref={nextSlideButtonRef}
                />
              </Swiper>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
