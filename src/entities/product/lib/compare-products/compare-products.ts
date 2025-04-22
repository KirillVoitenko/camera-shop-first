import { Product } from '@entities/product/model/types';

export const isEqualsProductsArray = (firstProductsArray: Product[], secondProductsArray: Product[]): boolean => {
  const firstProductsIds = firstProductsArray.map((current) => current.id);
  const secondProductsIds = secondProductsArray.map((current) => current.id);

  if (firstProductsIds.length === secondProductsIds.length) {
    for (let index = 0; index < firstProductsArray.length; index++) {
      if (firstProductsArray[index] !== secondProductsArray[index]) {
        return false;
      }
    }

    return true;
  }

  return false;
};
