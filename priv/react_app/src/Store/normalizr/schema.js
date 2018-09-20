/*
*		This class contains normalisation methods for the data recived by the server
*/

import { schema } from 'normalizr';

const merge = key => (entityA, entityB) => ({
  ...entityA,
  ...entityB,
  [key]: [...(entityA[key] || []), ...(entityB[key] || [])]
});

const belongsTo = key => (value, parent) => ({
  ...value,
  [key]: parent.id
});

const hasMany = key => (value, parent) => ({
  ...value,
  [key]: [parent.id]
});

const entity = (key, definition = {}, options = {}) =>
  new schema.Entity(key, definition, {
    mergeStrategy: options.merge,
    processStrategy: options.model
  });

const categorySchema = () => {
  const company = entity(
    'companies',
    {},
    { merge: merge('entries'), model: hasMany('entries') }
  );
  const entry = entity(
    'entries',
    { company },
    { model: belongsTo('attribute') }
  );
  const attribute = entity(
    'attributes',
    { entries: [entry] },
    { model: belongsTo('category') }
  );
  const category = entity('categories', { attributes: [attribute] });

  return category;
};

const categoriesSchema = () => {
  const attribute = entity('attributes', {}, { model: belongsTo('category') });
  const category = entity('categories', { attributes: [attribute] });

  return [category];
};

const companySchema = () => {
  const entry = entity('entries', {}, { model: belongsTo('company') });
  const company = entity('companies', { entries: [entry] });

  return company;
};

const companiesSchema = () => [companySchema()];

const userSchema = () => {
  const user = entity('users');

  return user;
};

const usersSchema = () => [userSchema()];

export default {
  categorySchema,
  categoriesSchema,
  companySchema,
  companiesSchema,
  userSchema,
  usersSchema
};
