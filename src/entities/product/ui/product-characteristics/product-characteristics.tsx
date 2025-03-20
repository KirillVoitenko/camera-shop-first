import { PRODUCT_CHARACTERISTICS_LIST_TEST_ID } from '@entities/product/config/const';
import { getProductTypeDisplayValue } from '@entities/product/lib/get-product-type-display-value';
import { Product } from '@entities/product/model/types';
import { JSX } from 'react';

type CharacteristicsViewType = 'buyModal' | 'page';

type ProductCharacteristicsProps = {
  viewType: CharacteristicsViewType;
  product: Product;
};

export function ProductCharacteristics({ product, viewType }: ProductCharacteristicsProps): JSX.Element {
  const listClassName = viewType === 'buyModal' ? 'basket-item__list' : 'product__tabs-list';
  return (
    <ul data-testid={PRODUCT_CHARACTERISTICS_LIST_TEST_ID} className={listClassName}>
      {viewType === 'buyModal' && (
        <>
          <li className='basket-item__list-item'>
            <span className='basket-item__article'>
              Артикул:
            </span>
            <span className='basket-item__number'>
              {product.vendorCode}
            </span>
          </li>
          <li className='basket-item__list-item'>
            {getProductTypeDisplayValue(product.type, product.category)} {product.category}
          </li>
          <li className='basket-item__list-item'>
            {product.level} уровень
          </li>
        </>
      )}
      {viewType === 'page' && (
        <>
          <li className='item-list'>
            <span className='item-list__title'>Артикул:</span>
            <p className='item-list__text'>{product.vendorCode}</p>
          </li>
          <li className='item-list'>
            <span className='item-list__title'>Категория:</span>
            <p className='item-list__text'>{product.category}</p>
          </li>
          <li className='item-list'>
            <span className='item-list__title'>Тип камеры:</span>
            <p className='item-list__text'>{product.type}</p>
          </li>
          <li className='item-list'>
            <span className='item-list__title'>Уровень:</span>
            <p className='item-list__text'>{product.level}</p>
          </li>
        </>
      )}
    </ul>
  );
}
