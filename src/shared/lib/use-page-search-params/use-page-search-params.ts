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

  const changePageSearchParams = (newParams: TParamsType) => {
    const oldParamsObject = convertToParamsObject(searchParams, initialValue);
    if (!isEqualsParamsObjects(oldParamsObject, newParams)) {
      const convertedNewSearchParams = convertToSearchParams(newParams, initialValue);
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
      if (searchParams.size === 0) {
        setSearchParams(convertToSearchParams(initialValue, initialValue));
      }
    },
  );

  return {
    changePageSearchParams,
    getConcretePageSearchParam,
    getPageSearchParams
  };
}
