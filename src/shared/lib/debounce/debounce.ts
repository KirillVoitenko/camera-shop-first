const DEFAULT_DELAY = 300;

export const debounce = <
  TFunctionType extends (...args: Parameters<TFunctionType>) => void
>(callback: TFunctionType, wait: number = DEFAULT_DELAY) => {
  let timeout: NodeJS.Timeout | undefined = undefined;

  const returnedFunction = (...args: Parameters<TFunctionType>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, wait);
  };

  return returnedFunction;
};
