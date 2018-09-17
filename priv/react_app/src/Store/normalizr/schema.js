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

const categorySchema = () => {
  const company = new schema.Entity(
    'companies',
    {},
    {
      mergeStrategy: merge('entries'),
      processStrategy: hasMany('entries')
    }
  );

  const entry = new schema.Entity(
    'entries',
    { company },
    {
      processStrategy: belongsTo('attribute')
    }
  );

  const attribute = new schema.Entity(
    'attributes',
    { entries: [entry] },
    {
      processStrategy: belongsTo('category')
    }
  );

  const category = new schema.Entity('categories', {
    attributes: [attribute]
  });

  return category;
};

const categoriesSchema = () => {
  const attribute = new schema.Entity(
    'attributes',
    {},
    {
      processStrategy: belongsTo('category')
    }
  );

  const category = new schema.Entity('categories', {
    attributes: [attribute]
  });

  return [category];
};

const companySchema = () => {
  const entry = new schema.Entity(
    'entries',
    {},
    {
      processStrategy: belongsTo('company')
    }
  );
  const company = new schema.Entity('companies', { entries: [entry] });

  return company;
};

const companiesSchema = () => [companySchema()];

const userSchema = () => {
  const user = new schema.Entity('users');

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
