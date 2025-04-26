import { ProductCategory } from '@entities/product';
import { FilterFormValue } from '@features/products-filter';

const SUPPORTED_PRODUCT_CATEGORIES: ProductCategory[] = [ProductCategory.PhotoCamera, ProductCategory.VideoCamera];

export const convertFilterPageParamsToUrlSearchParams = (filterParams: FilterFormValue, initialValue: FilterFormValue): URLSearchParams => {
  const result = new URLSearchParams();

  Object.keys(initialValue).forEach((current) => {
    const typedKey = current as keyof FilterFormValue;
    const paramValue = filterParams[typedKey] ?? initialValue[typedKey];

    if (paramValue) {
      result.set(typedKey, String(paramValue));
    }
  });

  return result;
};

export const convertUrlSearchParamsToFilterPageParams = (urlParams: URLSearchParams, initialValue: FilterFormValue): FilterFormValue => {
  const result = {...initialValue};

  Object.keys(initialValue).forEach((key) => {
    const typedKey = key as keyof FilterFormValue;
    const paramValue = urlParams.get(key);

    if (paramValue) {
      switch(typedKey) {
        case 'priceBegin':
        case 'priceEnd': {
          const parsedValue = Number.parseFloat(paramValue);
          result[typedKey] = Number.isNaN(parsedValue) ? result[typedKey] : paramValue;
          break;
        }
        case 'category': {
          if (SUPPORTED_PRODUCT_CATEGORIES.find((current) => current.toUpperCase() === paramValue.toUpperCase())) {
            result.category = paramValue as ProductCategory;
          }
          break;
        }
        default: {
          result[typedKey] = true;
        }
      }
    }
  });

  return result;
};
