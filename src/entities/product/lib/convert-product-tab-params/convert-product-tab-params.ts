import { CardTab, ProductCardSearchParams } from '@entities/product/model/types';
import { SUPPORTED_PRODUCT_TABS } from '@entities/product/config/const';

export const convertTabParamsObjectToSearchParams = (paramsObject: ProductCardSearchParams, initialValue: ProductCardSearchParams): URLSearchParams => {
  const result = new URLSearchParams();

  Object.keys(initialValue).forEach((current) => {
    const typedKey = current as keyof ProductCardSearchParams;

    if (paramsObject[typedKey]) {
      result.set(current, String(paramsObject[typedKey]));
    } else if (initialValue[typedKey]) {
      result.set(current, String(initialValue[typedKey]));
    }
  });

  return result;
};

export const convertSearchParamsToTabParamsObject = (searchParams: URLSearchParams, initialValue: ProductCardSearchParams): ProductCardSearchParams => {
  const result = {...initialValue};

  Object.keys(initialValue).forEach((current) => {
    const typedKey = current as keyof ProductCardSearchParams;
    const paramValue = searchParams.get(typedKey);

    if (paramValue) {
      switch(typedKey) {
        case 'activeTab': {
          if (SUPPORTED_PRODUCT_TABS.includes(paramValue as CardTab)) {
            result[typedKey] = paramValue as CardTab;
          }
          break;
        }
      }
    }

  });

  return result;
};
