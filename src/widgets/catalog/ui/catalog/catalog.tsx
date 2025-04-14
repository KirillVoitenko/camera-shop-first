import { Product, productsDataSelector } from '@entities/product';
import { ProductsList } from '@features/products-list';
import { ProductsSorting } from '@features/products-sorting';
import { useAppSelector } from '@shared/lib/store';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { JSX } from 'react';

type CatalogProps = Classed<{
  onBuyProductClick: (product: Product) => void;
}>;

export function Catalog({ className, onBuyProductClick }: CatalogProps): JSX.Element {
  const products = useAppSelector(productsDataSelector);

  const containerClassName = classNames('catalog__content', className);
  return (
    <div className={containerClassName}>
      <ProductsSorting
        products={products}
      >
        {(sortedProducts) => (
          <ProductsList onBuyButtonClick={onBuyProductClick} products={sortedProducts} />
        )}
      </ProductsSorting>
    </div>
  );
}
