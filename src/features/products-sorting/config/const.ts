import { ElementSize } from '@shared/model/html';
import { ProductsSortingValue, SortType, SortVector } from '../model/types';

export const INITIAL_SORTING: ProductsSortingValue = {
  type: 'PRICE',
  vector: 'UP'
};

export const VECTOR_SORTING_ICON_SIZE: ElementSize = {
  width: 16,
  height: 14
};

export const SORTING_CONTAINER_TEST_ID = 'sorting-container';

export enum SortRadioTestId {
  Price = 'sort-price',
  Rating = 'sort-rating',
  SortUp = 'sort-up',
  SortDown = 'sort-down'
}

export const SUPPORTED_SORTING_TYPES: SortType[] = ['PRICE', 'POPULAR'];
export const SUPPORTED_SORTING_VECTORS: SortVector[] = ['DOWN', 'UP'];
