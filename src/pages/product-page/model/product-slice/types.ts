import { Product } from '@entities/product';
import { BaseLoadableState } from '@shared/model/state';
import { Nullable } from '@shared/model/utill-types';
import { Comment } from '@entities/comment';

export interface ProductSliceState extends BaseLoadableState {
  product: Nullable<Product>;
  comments: Comment[];
  similarProducts: Product[];
}
