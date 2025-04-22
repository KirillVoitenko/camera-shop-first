import { Nullable } from '@shared/model/utill-types';
import { PriceLimit, Product, ProductCategory } from '@entities/product';
import { UseFormRegister } from 'react-hook-form';

export type FilterValue = {
  priceBegin: Nullable<number>;
  priceEnd: Nullable<number>;
  category: Nullable<ProductCategory>;
  hasDigitalType: boolean;
  hasCollectionType: boolean;
  hasFilmType: boolean;
  hasMomentalType: boolean;
  hasAmateurLevel: boolean;
  hasBeginnerLevel: boolean;
  hasProfessionalLevel: boolean;
}

type FilterFormField<TFieldType> = TFieldType extends number ? string : TFieldType;

export type FilterFormValue = {
  [TKey in keyof Omit<FilterValue, 'category'>] : FilterFormField<FilterValue[TKey]>
} & {
  category: ProductCategory | '';
}

export interface BaseFilterProps {
  register: UseFormRegister<FilterFormValue>;
}

export type PriceFilterFormFields = Pick<FilterFormValue, 'priceBegin' | 'priceEnd'>;

export type NonNullablePriceLimits = {
  [TKey in keyof PriceLimit] : NonNullable<PriceLimit[TKey]>
}

export type FilteredProductsInfo = {
  priceLimit: PriceLimit;
  filteredProducts: Product[];
}
