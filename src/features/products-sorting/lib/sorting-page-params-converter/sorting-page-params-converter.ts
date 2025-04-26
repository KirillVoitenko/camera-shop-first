import { SUPPORTED_SORTING_TYPES, SUPPORTED_SORTING_VECTORS } from '@features/products-sorting/config/const';
import { ProductSortingPageParams, SortType, SortVector } from '@features/products-sorting/model/types';

export const convertSortingParamsToUrlSearchParams = (paramsObject: ProductSortingPageParams, initialValues: ProductSortingPageParams): URLSearchParams => {
  const result = new URLSearchParams();

  Object.keys(initialValues).forEach((current) => {
    const typedKey = current as keyof ProductSortingPageParams;
    const paramValue = paramsObject[typedKey] ?? initialValues[typedKey];

    if (paramValue) {
      result.set(typedKey, String(paramValue));
    }
  });

  return result;
};

export const convertUrlSearchParamsToSortingParams = (urlParams: URLSearchParams, initialValues: ProductSortingPageParams): ProductSortingPageParams => {
  const result: ProductSortingPageParams = {...initialValues};

  Object.keys(initialValues).forEach((key) => {
    const typedKey = key as keyof ProductSortingPageParams;
    const paramValue = urlParams.get(typedKey);
    if (paramValue) {
      switch(typedKey) {
        case 'type': {
          if (SUPPORTED_SORTING_TYPES.find((current) => current.toUpperCase() === paramValue.toUpperCase())) {
            result.type = paramValue.toUpperCase() as SortType;
          }
          break;
        }
        case 'vector': {
          if (SUPPORTED_SORTING_VECTORS.find((current) => current.toUpperCase() === paramValue.toUpperCase())) {
            result.vector = paramValue.toUpperCase() as SortVector;
          }
          break;
        }
      }
    }
  });

  return result;
};
