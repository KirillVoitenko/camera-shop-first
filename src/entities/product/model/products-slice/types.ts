import { BaseLoadableState } from '@shared/model/state';
import { Product } from '../types';

export interface ProductSliceState extends BaseLoadableState {
  products: Product[];
}
