import { Product } from '@entities/product/model/types';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { JSX } from 'react';
import { BUY_BUTTON_TEST_ID, FULL_PRODUCT_CARD_TEST_ID } from '@entities/product/config/const';
import { Preview } from '@shared/ui/preview/preview';
import { RateInfo } from '@shared/ui/rate-info';
import { moneyFormat } from '@shared/lib/format';
import {
  REVIEW_IMAGE_SIZE,
  BUY_BUTTON_ICON_SIZE,
  RATING_ICON_SIZE,
} from './const';
import { ProductTabs } from '../product-tabs';

type FullProductCardProps = Classed<{
  product: Product;
  onBuyButtonClick: (product: Product) => void;
}>;

export function FullProductCard({ className, product, onBuyButtonClick }: FullProductCardProps): JSX.Element {
  const sectionClassName = classNames('product', className);

  const buyButtonClickHandler = () => onBuyButtonClick(product);

  return (
    <section className={sectionClassName} data-testid={FULL_PRODUCT_CARD_TEST_ID}>
      <div className='container'>
        <Preview
          className='product__img'
          image={{
            width: REVIEW_IMAGE_SIZE.width,
            height: REVIEW_IMAGE_SIZE.height,
            src: product.previewImg,
            srcSet: `${product.previewImg2x} 2x`,
            alt: product.name
          }}
          source={{
            srcSet: `/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`
          }}
        />
        <div className='product__content'>
          <h1 className='title title--h3'>{product.name}</h1>
          <RateInfo
            className='product__rate'
            averageRating={product.rating}
            reviewsCount={product.reviewCount}
            iconSize={RATING_ICON_SIZE}
          />
          <p className='product__price'>
            <span className='visually-hidden' />
            {moneyFormat(product.price)}
          </p>
          <button className='btn btn--purple' type='button' data-testid={BUY_BUTTON_TEST_ID} onClick={buyButtonClickHandler}>
            <svg width={BUY_BUTTON_ICON_SIZE.width} height={BUY_BUTTON_ICON_SIZE.height} aria-hidden>
              <use xlinkHref='#icon-add-basket' />
            </svg>
          </button>
          <ProductTabs product={product} />
        </div>
      </div>
    </section>
  );
}
