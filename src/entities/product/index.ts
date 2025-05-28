import {
  type Product,
  ProductCategory,
  ProductType,
  RecommendedUserLevel,
  type PromoProduct
} from './model/types';
import {
  fetchProductsAction,
  productSliceReducer,
  productsDataSelector,
  productsLoadingSelector,
  promoProductsDataSelector
} from './model/products-slice';
import { ShortProductCard } from './ui/short-product-card';
import { FullProductCard } from './ui/full-product-card';
import { BasketProductCard } from './ui/basket-product-card';
import { isEqualsProductsArray } from './lib/compare-products';
import { getPriceLimitsByProducts, PriceLimit } from './lib/utills';

export {
  Product,
  ProductCategory,
  ProductType,
  PromoProduct,
  RecommendedUserLevel,
  fetchProductsAction,
  productSliceReducer,
  productsDataSelector,
  productsLoadingSelector,
  promoProductsDataSelector,
  ShortProductCard,
  FullProductCard,
  BasketProductCard,
  isEqualsProductsArray,
  getPriceLimitsByProducts,
  type PriceLimit
};
