import { Product } from '@entities/product/model/types';
import { Nullable } from '@shared/model/utill-types';

export type PriceLimit = {
  min: Nullable<number>;
  max: Nullable<number>;
}

const INITIAL_PRICE_LIMIT: PriceLimit = {
  max: null,
  min: null,
};

export const getPriceLimitsByProducts = (products: Product[]): PriceLimit => products.reduce<PriceLimit>(
  (accum, current) => ({
    min: (accum.min ?? Number.MAX_SAFE_INTEGER) > current.price ? current.price : accum.min,
    max: (accum.max ?? 0) < current.price ? current.price : accum.max,
  }),
  INITIAL_PRICE_LIMIT
);
