import {
  isObject,
  isArray,
  reduce,
  camelCase,
  snakeCase,
  pickBy
} from 'lodash/fp';
import moment from 'moment';

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

export const formify = data => {
  const formData = new FormData();
  Object.keys(pickBy(isObject, data)).forEach(objKey => {
    Object.keys(data[objKey]).forEach(key => {
      formData.append(
        `${snakeCase(objKey)}[${snakeCase(key)}]`,
        data[objKey][key]
      );
    });
  });
  return formData;
};

export const dateFormat = time => moment(time).format('dddd D MMMM YYYY h:mm');

export default {
  dateFormat,
  camelCaseKeys,
  snakeCaseKeys,
  formify
};
