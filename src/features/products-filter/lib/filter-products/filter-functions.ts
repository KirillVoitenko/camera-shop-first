import {
  PriceLimit,
  Product,
  ProductCategory,
  ProductType,
  RecommendedUserLevel
} from '@entities/product';
import { FilterValue, NonNullablePriceLimits } from '@features/products-filter/model/types';
import { Nullable } from '@shared/model/utill-types';
import { DefaultPriceValues } from '@features/products-filter/config/const';

export type ProductTypeFilterFields = Pick<FilterValue, 'hasDigitalType' | 'hasCollectionType' | 'hasFilmType' | 'hasMomentalType'>;
export type ProductLevelFilterFields = Pick<FilterValue, 'hasAmateurLevel' | 'hasBeginnerLevel' | 'hasProfessionalLevel'>;

const TYPE_FILTER_FIELDS: Array<keyof ProductTypeFilterFields> = ['hasCollectionType', 'hasDigitalType', 'hasFilmType', 'hasMomentalType'];
const LEVEL_FILTER_FIELDS: Array<keyof ProductLevelFilterFields> = ['hasAmateurLevel', 'hasBeginnerLevel', 'hasProfessionalLevel'];

export const isExistsProductByPriceFilter = (product: Product, priceLimit: PriceLimit): boolean => {
  const limits: NonNullablePriceLimits = {
    max: priceLimit.max ?? DefaultPriceValues.priceEnd,
    min: priceLimit.min ?? DefaultPriceValues.priceBegin
  };

  return product.price >= limits.min && product.price <= limits.max;
};

export const isExistsProductByTypeFilter = (product: Product, typeFilterFields: ProductTypeFilterFields): boolean => {
  const isSelectedTypeInFilter = TYPE_FILTER_FIELDS.some((current) => typeFilterFields[current]);

  if (isSelectedTypeInFilter) {
    let filterResult = false;

    const productType = product.type.toLowerCase();

    if (typeFilterFields.hasCollectionType) {
      filterResult = filterResult || productType === ProductType.Collection.toLowerCase();
    }
    if (typeFilterFields.hasDigitalType) {
      filterResult = filterResult || productType === ProductType.Digital.toLowerCase();
    }
    if (typeFilterFields.hasFilmType) {
      filterResult = filterResult || productType === ProductType.Film.toLowerCase();
    }
    if (typeFilterFields.hasMomentalType) {
      filterResult = filterResult || productType === ProductType.Momental.toLowerCase();
    }

    return filterResult;
  }

  return true;
};

export const isExistsByUserLevelFilter = (product: Product, levelFilterFields: ProductLevelFilterFields): boolean => {
  const isSelectedLevelFields = LEVEL_FILTER_FIELDS.some((current) => levelFilterFields[current]);

  if (isSelectedLevelFields) {
    let filterResult = false;
    const productLevel = product.level.toLowerCase();

    if (levelFilterFields.hasAmateurLevel) {
      filterResult = filterResult || productLevel === RecommendedUserLevel.Amateur.toLowerCase();
    }
    if (levelFilterFields.hasBeginnerLevel) {
      filterResult = filterResult || productLevel === RecommendedUserLevel.Beginner.toLowerCase();
    }
    if (levelFilterFields.hasProfessionalLevel) {
      filterResult = filterResult || productLevel === RecommendedUserLevel.Professional.toLowerCase();
    }

    return filterResult;
  }

  return true;
};

export const isExistsByCategoryFilter = (product: Product, selectedCategory: Nullable<ProductCategory>): boolean =>
  selectedCategory
    ? product.category.toLowerCase() === selectedCategory.toLowerCase()
    : true;
