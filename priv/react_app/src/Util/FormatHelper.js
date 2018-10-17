import {
  isObject,
  isArray,
  reduce,
  camelCase,
  snakeCase,
  has
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

const dateFormats = ['YYYY-MM-DD HH:mm'];

export const toFormData = (obj, form, namespace) => {
  const fd = form || new FormData();
  let formKey;

  Object.keys(obj).forEach(key => {
    if (has(key, obj)) {
      const snakeKey = snakeCase(key);
      const value = obj[key];
      if (namespace) {
        formKey = `${namespace}[${snakeKey}]`;
      } else {
        formKey = snakeKey;
      }

      if (moment(value, dateFormats, true).isValid()) {
        fd.append(formKey, moment.utc(value).toISOString());
      } else if (isObject(value) && !(value instanceof File)) {
        const nil = has('uid', value) && value.uid === '-1';
        if (!nil) toFormData(value, fd, formKey);
      } else {
        fd.append(formKey, value);
      }
    }
  });

  return fd;
};

export const toDayFormat = time =>
  moment.utc(time).format('dddd D MMMM YYYY HH:mm');

export const StudentSessionTimeFormat = time =>
  moment.utc(time).format('dddd D MMM HH:mm');

export default {
  toDayFormat,
  camelCaseKeys,
  snakeCaseKeys,
  toFormData,
  StudentSessionTimeFormat
};
