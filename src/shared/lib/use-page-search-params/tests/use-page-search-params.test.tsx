import { renderHook, act } from '@testing-library/react';
import { withRouter } from '@test-utills/wrappers';
import { usePageSearchParams } from '../use-page-search-params';
import { createMemoryHistory } from 'history';
import { FC, PropsWithChildren } from 'react';
import faker from 'faker';

type TestPageParams = {
  param1: string;
  param2: string;
}

const TEST_PARAMS_INITIAL_VALUE: TestPageParams = {
  param1: faker.datatype.string(),
  param2: faker.datatype.string()
};

const convertTestParamsToSearchParams = (params: TestPageParams) => new URLSearchParams(Object.entries(params));
const convertSearchParamsToTestParams = (urlParams: URLSearchParams) => {
  const result = {...TEST_PARAMS_INITIAL_VALUE};
  Object.keys(result).forEach((current) => {
    const typedKey = current as keyof TestPageParams;
    const paramValue = urlParams.get(typedKey);

    if (paramValue) {
      result[typedKey] = paramValue;
    }
  });

  return result;
};

const INIT_ROUTE = '/init-route';

const history = createMemoryHistory();

const wrapper: FC<PropsWithChildren> = ({children}) => withRouter(<div>{children}</div>, history);

describe('hook \'usePageSearchParams\'', () => {
  const convertParamsSpyedFunction = vi.fn<[TestPageParams, TestPageParams], URLSearchParams>(convertTestParamsToSearchParams);
  const convertSearchSpyedFunction = vi.fn<[URLSearchParams, TestPageParams], TestPageParams>(convertSearchParamsToTestParams);

  beforeEach(() => {
    convertParamsSpyedFunction.mockReset();
    convertSearchSpyedFunction.mockReset();
    history.replace(INIT_ROUTE);
  });

  it('should return correct signature', () => {
    const { result } = renderHook(() => usePageSearchParams(
      TEST_PARAMS_INITIAL_VALUE,
      convertTestParamsToSearchParams,
      convertSearchParamsToTestParams
    ), {
      wrapper
    });

    expect(typeof result.current.changePageSearchParams).toBe('function');
    expect(typeof result.current.getConcretePageSearchParam).toBe('function');
    expect(typeof result.current.getPageSearchParams).toBe('function');
  });

  it('method \'getConcretePageSearchParam\' should return correct value', () => {
    const paramName: keyof TestPageParams = 'param1';
    const { result } = renderHook(() => usePageSearchParams(
      TEST_PARAMS_INITIAL_VALUE,
      convertTestParamsToSearchParams,
      convertSearchParamsToTestParams
    ), {
      wrapper
    });

    const paramValue = result.current.getConcretePageSearchParam(paramName);

    expect(paramValue).toBe(TEST_PARAMS_INITIAL_VALUE[paramName]);

  });

  it('method \'getPageSearchParams\' should return correct value', () => {
    const { result } = renderHook(() => usePageSearchParams(
      TEST_PARAMS_INITIAL_VALUE,
      convertTestParamsToSearchParams,
      convertSearchParamsToTestParams
    ), {
      wrapper
    });

    const params = result.current.getPageSearchParams();

    expect(params).toEqual(TEST_PARAMS_INITIAL_VALUE);

  });

  it('method \'getPageSearchParams\' should correct works', () => {
    const { result } = renderHook(() => usePageSearchParams(
      TEST_PARAMS_INITIAL_VALUE,
      convertTestParamsToSearchParams,
      convertSearchParamsToTestParams
    ), {
      wrapper
    });

    const newParams = {...TEST_PARAMS_INITIAL_VALUE};
    newParams.param2 = faker.lorem.word();

    act(() => result.current.changePageSearchParams(newParams));

    const paramsValue = result.current.getPageSearchParams();

    expect(paramsValue).toEqual(newParams);

  });
});
