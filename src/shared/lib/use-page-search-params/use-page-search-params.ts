import { useSearchParams } from 'react-router-dom';
import { isEqualsParamsObjects, mergeSearchParams } from './utills';
import { useEffect } from 'react';

type BaseSearchParams = Required<Record<string, unknown>>;

type ToSearchParamsConverter<TParamsType> = (paramsObject: TParamsType, initialValue: TParamsType) => URLSearchParams;
type ToParamsObjectConverter<TParamsType> = (searchParams: URLSearchParams, initialValue: TParamsType) => TParamsType;

type UsePageParamsReturn<TParamsType extends BaseSearchParams = BaseSearchParams> = {
  changePageSearchParams: (newParams: TParamsType) => void;
  getPageSearchParams: () => TParamsType;
  getConcretePageSearchParam: <TParamKey extends keyof TParamsType>(paramName: TParamKey) => TParamsType[TParamKey];
}

export function usePageSearchParams<TParamsType extends BaseSearchParams = BaseSearchParams>(
  initialValue: TParamsType,
  convertToSearchParams: ToSearchParamsConverter<TParamsType>,
  convertToParamsObject: ToParamsObjectConverter<TParamsType>
): UsePageParamsReturn<TParamsType> {
  const [searchParams, setSearchParams] = useSearchParams();

  const changePageSearchParams = (newParams: Partial<TParamsType>) => {
    const oldParamsObject = convertToParamsObject(searchParams, initialValue);
    const fullNewParamsObject: TParamsType = { ...oldParamsObject, ...newParams };
    if (!isEqualsParamsObjects(oldParamsObject, fullNewParamsObject)) {
      const convertedNewSearchParams = convertToSearchParams(fullNewParamsObject, initialValue);
      setSearchParams(mergeSearchParams(searchParams, convertedNewSearchParams));
    }
  };

  const getPageSearchParams = () => convertToParamsObject(searchParams, initialValue);

  const getConcretePageSearchParam = <TParamKey extends keyof TParamsType>(paramName: TParamKey): TParamsType[TParamKey] => {
    const convertedParamsObject = convertToParamsObject(searchParams, initialValue);
    return convertedParamsObject[paramName];
  };

  useEffect(
    () => {
      const paramsObjectKeys = Object.keys(initialValue);
      const searchParamsKeys = Array.from(searchParams.keys());
      if (!searchParamsKeys.some((current) => paramsObjectKeys.includes(current))) {
        changePageSearchParams(initialValue);
      }
    }
  );

  return {
    changePageSearchParams,
    getConcretePageSearchParam,
    getPageSearchParams
  };
}
