import { PagePaginationParams } from '@features/pagination/model/types';

export const convertPaginationParamsToSearchParams = (paginationParams: PagePaginationParams, initialValue: PagePaginationParams): URLSearchParams => {
  const result = new URLSearchParams();

  Object.keys(initialValue)
    .forEach((current) => {
      const typedKey = current as keyof PagePaginationParams;
      const paramValue = paginationParams[typedKey] ?? initialValue[typedKey];

      if (paramValue) {
        result.set(typedKey, String(paramValue));
      }
    });

  return result;
};

export const convertSearchParamsToPaginationParams = (searchParams: URLSearchParams, initialValue: PagePaginationParams): PagePaginationParams => {
  const result = {...initialValue};

  Object.keys(initialValue)
    .forEach((current) => {
      const paramValue = searchParams.get(current);
      const typedKey = current as keyof PagePaginationParams;
      const castedParamValue = Number(paramValue);
      if (paramValue) {
        switch(typedKey) {
          case 'page': {
            result.page = Number.isNaN(castedParamValue) ? initialValue.page : Number(paramValue);
            break;
          }
        }
      }
    });

  return result;
};
