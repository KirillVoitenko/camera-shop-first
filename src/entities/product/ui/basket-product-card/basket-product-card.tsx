import { JSX, PropsWithChildren } from 'react';
import { Classed } from '@shared/model/style-types';
import { Product } from '@entities/product/model/types';
import classNames from 'classnames';
import { Preview } from '@shared/ui/preview';
import { ElementSize } from '@shared/model/html';
import { ProductCharacteristics } from '../product-characteristics';

type BasketProductCardProps = Classed<PropsWithChildren<{
  product: Product;
}>>;

const PREVIEW_SIZE: ElementSize = {
  width: 140,
  height: 120,
};

export function BasketProductCard({product, className, children}: BasketProductCardProps): JSX.Element {
  const containerClassName = classNames('basket-item', className);

  return (
    <div className={containerClassName} data-testid='basket-product-card'>
      <Preview
        image={{
          src: `/${product.previewImg}`,
          srcSet: `/${product.previewImg2x} 2x`,
          alt: `${product.category} ${product.name}`,
          width: PREVIEW_SIZE.width,
          height: PREVIEW_SIZE.height
        }}
        source={{
          srcSet: `/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`
        }}
        className='basket-item__img'
      />
      <div className='basket-item__description'>
        <p className='basket-item__title'>
          {`${product.category} ${product.name}`}
        </p>
        <ProductCharacteristics viewType='basket' product={product} />
        {children}
      </div>
    </div>
  );
}
