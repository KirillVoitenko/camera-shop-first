import { BaseLoadableState } from '@shared/model/state';
import { Product, PromoProduct } from '../types';

export interface ProductSliceState extends BaseLoadableState {
  products: Product[];
  promos: PromoProduct[];
}
