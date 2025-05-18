import { Product } from '@entities/product/model/types';
import { ClassedAndStyled } from '@shared/model/style-types';
import classNames from 'classnames';
import { JSX } from 'react';
import { BUY_BUTTON_TEST_ID, SHORT_PRODUCT_CARD_TEST_ID } from '@entities/product/config/const';
import { Preview } from '@shared/ui/preview/preview';
import { ElementSize } from '@shared/model/html';
import { RateInfo } from '@shared/ui/rate-info';
import { moneyFormat } from '@shared/lib/format';
import { generatePath, Link, } from 'react-router-dom';
import { AppRoutesEnum } from '@shared/model/enums';
import { SvgIcon } from '@shared/ui/svg-icon';

type ShortProductCardProps = ClassedAndStyled<{
  product: Product;
  onBuyButtonClick: (product: Product) => void;
  inBasketProduct?: boolean;
}>

const PREVIEW_SIZE: ElementSize = {
  height: 240,
  width: 280
};

const BASKET_ICON_SIZE: ElementSize = {
  width: 16,
  height: 16
};

export function ShortProductCard({ onBuyButtonClick, product, className, style, inBasketProduct = false }: ShortProductCardProps): JSX.Element {
  const containerClassName = classNames('product-card', className);
  const productPageUrl = generatePath(AppRoutesEnum.Product, { productId: String(product.id) });
  const buyButtonClickHandler = () => onBuyButtonClick(product);
  return (
    <div className={containerClassName} data-testid={SHORT_PRODUCT_CARD_TEST_ID} style={style}>
      <Preview
        className='product-card__img'
        image={{
          src: `/${product.previewImg}`,
          srcSet: `/${product.previewImg2x} 2x`,
          width: PREVIEW_SIZE.width,
          height: PREVIEW_SIZE.height,
          alt: product.name
        }}
        source={{
          srcSet: `/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`
        }}
      />
      <div className='product-card__info'>
        <RateInfo averageRating={product.rating} reviewsCount={product.reviewCount} className='product-card__rate' />
        <p className='product-card__title' style={{ width: '100%' }}>
          {product.name}
        </p>
        <p className='product-card__price'>
          <span className='visually-hidden'>
            Цена:
          </span>
          {moneyFormat(product.price)}
        </p>
      </div>
      <div className='product-card__buttons'>
        {inBasketProduct
          ? (
            <Link
              to={AppRoutesEnum.Basket}
              className='btn btn--purple-border product-card__btn product-card__btn--in-cart'
            >
              <SvgIcon
                size={BASKET_ICON_SIZE}
                xlinkHref='#icon-basket'
              />
              В корзине
            </Link>
          )
          : (
            <button className='btn btn--purple product-card__btn' onClick={buyButtonClickHandler} data-testid={BUY_BUTTON_TEST_ID}>
              Купить
            </button>
          )}
        <Link to={productPageUrl} className='btn btn--transparent'>
          Подробнее
        </Link>
      </div>
    </div>
  );
}
