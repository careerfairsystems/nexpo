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

const roleSchema = () => {
  const user = entity('users', {}, { model: belongsTo('role') });

  const role = entity('roles', { users: [user] });

  return role;
};

const rolesSchema = () => [roleSchema()];

const userSchema = () => {
  const company = entity('companies');
  const sessionApplication = entity(
    'session_applications',
    { company },
    { model: belongsTo('student') }
  );
  const student = entity(
    'students',
    {
      session_applications: [sessionApplication]
    },
    { model: belongsTo('user') }
  );
  const role = entity('roles', {}, { model: belongsTo('user') });

  const user = entity('users', { roles: [role], student });

  return user;
};

const usersSchema = () => [userSchema()];

export default {
  categorySchema,
  categoriesSchema,
  companySchema,
  companiesSchema,
  roleSchema,
  rolesSchema,
  userSchema,
  usersSchema
};
