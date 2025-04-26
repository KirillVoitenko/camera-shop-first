export const mergeSearchParams = (source: URLSearchParams, merged: URLSearchParams): URLSearchParams => {
  Array.from(merged.entries())
    .forEach(([paramName, paramValue]) => {
      source.set(paramName, paramValue);
    });

  return source;
};

export const isEqualsParamsObjects = <TObjectType extends Record<string, unknown>>(firstObject: TObjectType, secondObject: TObjectType): boolean => {
  const firstObjectKeys = Object.keys(firstObject);
  const secondObjectKeys = Object.keys(secondObject);

  if (firstObjectKeys.length === secondObjectKeys.length) {
    const isEqualsKeys = firstObjectKeys.every((current) => secondObjectKeys.includes(current));

    if (isEqualsKeys) {
      return firstObjectKeys.every((current) => {
        const typedKey = current as keyof TObjectType;
        return firstObject[typedKey] === secondObject[typedKey];
      });
    }

    return false;
  }

  return false;
};
