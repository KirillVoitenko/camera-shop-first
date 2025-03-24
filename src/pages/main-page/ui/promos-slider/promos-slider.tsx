import { useAppSelector } from '@shared/lib/store';
import { JSX } from 'react';
import { PROMOS_COUNT, PROMOS_AUTOPLAY_DELAY } from '@pages/main-page/config/const';
import { promoProductsDataSelector } from '@entities/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { Preview } from '@shared/ui/preview';
import { ElementSize } from '@shared/model/html';
import { generatePath, Link } from 'react-router-dom';
import { AppRoutesEnum } from '@shared/model/enums';

const BANNER_SIZE: ElementSize = {
  height: 280,
  width: 1280
};

export function PromosSlider(): JSX.Element {
  const promos = useAppSelector(promoProductsDataSelector);

  const displayedPromos = promos.slice(0, PROMOS_COUNT).sort((first, second) => first.id - second.id);

  return (
    <Swiper
      modules={[Pagination, Autoplay, Navigation]}
      autoplay={{
        delay: PROMOS_AUTOPLAY_DELAY,
        disableOnInteraction: true
      }}
      pagination={{
        horizontalClass: 'promos-slider-pagination-horizontal',
        clickable: true,
        enabled: true,
        type: 'bullets',
        bulletClass: 'promo-bullet',
        bulletActiveClass: 'active-bullet'
      }}
    >
      {displayedPromos.map((current) => (
        <SwiperSlide key={current.id}>
          <Preview
            className='banner'
            image={{
              src: `/${current.previewImg}`,
              srcSet: `/${current.previewImg2x} 2x`,
              alt: current.name,
              width: BANNER_SIZE.width,
              height: BANNER_SIZE.height
            }}
            source={{
              srcSet: `/${current.previewImgWebp}, /${current.previewImgWebp2x} 2x`
            }}
          >
            <p className='banner__info'>
              <span className='banner__message'>
                Новинка!
              </span>
              <span className='title title--h1'>
                {current.name}
              </span>
              <span className='banner__text'>
                Профессиональная камера от&nbsp;известного производителя
              </span>
              <Link
                className='btn'
                to={generatePath(AppRoutesEnum.Product, { productId: String(current.id) })}
              >
                Подробнее
              </Link>
            </p>
          </Preview>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
