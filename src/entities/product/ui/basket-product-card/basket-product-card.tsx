import { ComponentProps, ElementType, JSX } from 'react';
import { Product } from '@entities/product/model/types';
import classNames from 'classnames';
import { Preview } from '@shared/ui/preview';
import { ElementSize } from '@shared/model/html';
import { ProductCharacteristics } from '../product-characteristics';

type BaseBasketCardProps<TElementType extends ElementType = ElementType> = {
  product: Product;
  previewSize?: ElementSize;
  as?: TElementType;
  renderDescriptionExtraInfo?: (product: Product) => JSX.Element;
}

type BasketProductCardProps<TElementType extends ElementType> = BaseBasketCardProps<TElementType> & Omit<ComponentProps<TElementType>, keyof BaseBasketCardProps>;

const PREVIEW_SIZE: ElementSize = {
  width: 140,
  height: 120,
};

const DEFAULT_ELEMENT = 'div';

export function BasketProductCard<TElementType extends ElementType = typeof DEFAULT_ELEMENT>({
  product,
  className,
  children,
  renderDescriptionExtraInfo,
  as,
  previewSize = PREVIEW_SIZE,
  ...otherProps
}: BasketProductCardProps<TElementType>): JSX.Element {
  const containerClassName = classNames('basket-item', className);
  const TagName = as || DEFAULT_ELEMENT;

  return (
    <TagName className={containerClassName} data-testid='basket-product-card' {...otherProps}>
      <Preview
        image={{
          src: `/${product.previewImg}`,
          srcSet: `/${product.previewImg2x} 2x`,
          alt: `${product.category} ${product.name}`,
          width: previewSize.width,
          height: previewSize.height
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
        {renderDescriptionExtraInfo && renderDescriptionExtraInfo(product)}
      </div>
      {children}
    </TagName>
  );
}
