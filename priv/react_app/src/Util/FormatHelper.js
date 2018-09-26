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

const convertForm = (obj, convert) => {
  const formData = new FormData();

  Array.from(obj.entries()).forEach(([key, value]) =>
    formData.append(convert(key), value)
  );

  return formData;
};

export const camelCaseForm = obj =>
  convertForm(obj, key => key.replace(/_([a-z])/g, g => g[1].toUpperCase()));
export const snakeCaseForm = obj =>
  convertForm(obj, key => key.replace(/([A-Z])/g, '_$1').toLowerCase());

export default { camelCaseKeys, snakeCaseKeys, camelCaseForm, snakeCaseForm };
