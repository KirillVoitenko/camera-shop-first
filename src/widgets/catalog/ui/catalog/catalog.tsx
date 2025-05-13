import { Product, productsDataSelector } from '@entities/product';
import { ProductsSorting } from '@features/products-sorting';
import { useAppSelector } from '@shared/lib/store';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { ProductsFilter } from '@features/products-filter';
import { Pagination } from '@features/pagination';
import { JSX } from 'react';

type CatalogProps = Classed<{
  renderProductsList: (products: Product[]) => JSX.Element;
}>;

export function Catalog({ className, renderProductsList }: CatalogProps): JSX.Element {
  const products = useAppSelector(productsDataSelector);

  const containerClassName = classNames('catalog__content', className);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {products.length === 0
        ? <p>К сожалению все раскупили</p>
        : (
          <ProductsFilter
            products={products}
          >
            {(filteredProducts) => (
              <div className={containerClassName}>
                <ProductsSorting
                  products={filteredProducts}
                >
                  {(sortedProducts) => (
                    <Pagination
                      items={sortedProducts}
                    >
                      {(itemsByPage) => renderProductsList(itemsByPage)}
                    </Pagination>
                  )}
                </ProductsSorting>
              </div>
            )}
          </ProductsFilter>)}
    </>

  );
}
