import { Product } from '@entities/product';
import { ProductsSortingValue } from '../model/types';

type ProductSortingFields = Pick<Product, 'price' | 'rating'>;

export const sortProducts = (products: Product[], sortingValue: ProductsSortingValue): Product[] => [...products].sort(
  (firstProduct, secondProduct) => {
    const sortedKey: keyof ProductSortingFields = sortingValue.type === 'PRICE' ? 'price' : 'rating';

    if (sortingValue.vector === 'UP') {
      return firstProduct[sortedKey] - secondProduct[sortedKey];
    }

    return secondProduct[sortedKey] - firstProduct[sortedKey];
  }
);
