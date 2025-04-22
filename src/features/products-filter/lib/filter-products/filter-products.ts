import { getPriceLimitsByProducts, Product } from '@entities/product';
import { FilteredProductsInfo, FilterValue, NonNullablePriceLimits } from '@features/products-filter/model/types';
import { isExistsByCategoryFilter, isExistsByUserLevelFilter, isExistsProductByPriceFilter, isExistsProductByTypeFilter } from './filter-functions';
import { DefaultPriceValues } from '@features/products-filter/config/const';

export const getFilteredProductsInfo = (products: Product[], filter: FilterValue): FilteredProductsInfo => {
  const filteredProducts = products.filter((current) => {
    const hasTypeFilter = isExistsProductByTypeFilter(current, filter);
    const hasLevelFilter = isExistsByUserLevelFilter(current, filter);
    const hasCategoryFilter = isExistsByCategoryFilter(current, filter.category);
    return hasCategoryFilter && hasTypeFilter && hasLevelFilter;
  });

  const priceLimit = getPriceLimitsByProducts(filteredProducts);

  const minLimitInFilter = Math.max(priceLimit.min ?? DefaultPriceValues.priceBegin, filter.priceBegin ?? DefaultPriceValues.priceBegin);
  const maxLimitInFilter = Math.min(priceLimit.max ?? DefaultPriceValues.priceEnd, filter.priceEnd ?? DefaultPriceValues.priceEnd);

  const priceFilterRange: NonNullablePriceLimits = {
    max: maxLimitInFilter,
    min: minLimitInFilter
  };

  return {
    filteredProducts: filteredProducts.filter((current) => isExistsProductByPriceFilter(current, priceFilterRange)),
    priceLimit
  };
};
