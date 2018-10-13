import {
  isObject,
  isArray,
  reduce,
  camelCase,
  snakeCase,
  pickBy,
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

export const formify = data => {
  const formData = new FormData();
  Object.keys(pickBy(isObject, data)).forEach(objKey => {
    Object.keys(data[objKey]).forEach(key => {
      console.log(data[objKey][key]);
      formData.append(
        `${snakeCase(objKey)}[${snakeCase(key)}]`,
        data[objKey][key]
      );
    });
  });
  return formData;
};

const dateFormats = ['YYYY-MM-DD HH:mm'];

export const toFormData = (obj, form, namespace) => {
  const fd = form || new FormData();
  let formKey;

  Object.keys(obj).forEach(key => {
    if (has(key, obj) && obj[key]) {
      const snakeKey = snakeCase(key);
      const value = obj[key];
      if (namespace) {
        formKey = `${namespace}[${snakeKey}]`;
      } else {
        formKey = snakeKey;
      }

      if (moment(value, dateFormats, true).isValid()) {
        fd.append(formKey, moment(value).toISOString());
      } else if (isObject(value) && !(value instanceof File)) {
        toFormData(value, fd, formKey);
      } else {
        fd.append(formKey, value);
      }
    }
  });

  return fd;
};

export const dateFormat = time => moment(time).format('dddd D MMMM YYYY h:mm');

export default {
  dateFormat,
  camelCaseKeys,
  snakeCaseKeys,
  formify,
  toFormData
};
