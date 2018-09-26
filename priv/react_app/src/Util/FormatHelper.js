import { isObject, isArray, reduce, camelCase, snakeCase } from 'lodash/fp';

const convertKeys = (obj, convert) => {
  if (!isObject(obj)) {
    return obj;
  }
  if (isArray(obj)) {
    return obj.map(v => convertKeys(v, convert));
  }

  const convertKey = (acc, key) => ({
    ...acc,
    [convert(key)]: convertKeys(obj[key], convert)
  });

  return reduce(convertKey, {}, Object.keys(obj));
};

export const camelCaseKeys = obj => convertKeys(obj, camelCase);
export const snakeCaseKeys = obj => convertKeys(obj, snakeCase);

export default { camelCaseKeys, snakeCaseKeys };
