import { FilterFormValue } from '../model/types';

export const INITIAL_FILTER: FilterFormValue = {
  category: '',
  priceBegin: '',
  priceEnd: '',
  hasAmateurLevel: false,
  hasBeginnerLevel: false,
  hasCollectionType: false,
  hasDigitalType: false,
  hasFilmType: false,
  hasMomentalType: false,
  hasProfessionalLevel: false,
};

export enum DefaultPriceValues {
  priceBegin = 0,
  priceEnd = Number.MAX_VALUE
}

export enum FilterFieldsetTestId {
  Price = 'price-filter-fieldset',
  Type = 'type-filter-fieldset',
  Category = 'category-filter-fieldset',
  Level = 'level-filter-fieldset',
}

export const FILTER_FORM_TEST_ID = 'filter-form';
