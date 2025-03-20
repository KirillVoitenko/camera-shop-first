import { ProductCategory, ProductType } from '@entities/product/model/types';

export const photoCategoryDisplayValues = new Map<ProductType, string>([
  [ProductType.Collection, 'Коллекционный'],
  [ProductType.Digital, 'Цифровой'],
  [ProductType.Film, 'Плёночный'],
  [ProductType.Momental, 'Моментальный']
]);

export const getProductTypeDisplayValue = (type: ProductType, category: ProductCategory): string => {
  if (category === ProductCategory.PhotoCamera) {
    return photoCategoryDisplayValues.get(type) ?? '';
  }

  return type;
};
