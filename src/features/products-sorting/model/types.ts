export type SortType = 'PRICE' | 'POPULAR';
export type SortVector = 'UP' | 'DOWN';

export type ProductsSortingValue = {
  type: SortType;
  vector: SortVector;
}
