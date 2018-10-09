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

const mailtemplateSchema = () => entity('mailtemplates');
const mailtemplatesSchema = () => [mailtemplateSchema()];

const deadlineSchema = () => entity('deadlines');
const deadlinesSchema = () => [deadlineSchema()];

const sessionApplicationSchema = () => {
  const company = entity(
    'companies',
    {},
    { model: hasMany('student_session_applications') }
  );
  const student = entity(
    'students',
    {},
    { model: hasMany('student_session_applications') }
  );
  const application = entity('student_session_applications', {
    company,
    student
  });
  return application;
};
const studentSessionApplicationsSchema = () => [sessionApplicationSchema()];

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
  const user = entity('users');
  const entry = entity('entries', {}, { model: belongsTo('company') });
  const company = entity('companies', { entries: [entry], users: [user] });

  return company;
};

const companiesSchema = () => [companySchema()];

const roleSchema = () => {
  const user = entity('users', {}, { model: belongsTo('role') });

  const role = entity('roles', { users: [user] });

  return role;
};

const rolesSchema = () => [roleSchema()];

const studentSchema = () => {
  const student = entity('students', {}, { model: belongsTo('user') });

  return student;
};

const studentsSchema = () => [studentSchema()];

const userSchema = () => {
  const company = entity('companies');
  const sessionApplication = entity(
    'student_session_applications',
    { company },
    { model: belongsTo('student') }
  );
  const student = entity(
    'students',
    {
      student_session_applications: [sessionApplication]
    },
    { model: belongsTo('user') }
  );
  const role = entity('roles', {}, { model: belongsTo('user') });

  const user = entity('users', { roles: [role], student, company });

  return user;
};

const usersSchema = () => [userSchema()];

export default {
  categorySchema,
  categoriesSchema,
  companySchema,
  companiesSchema,
  mailtemplateSchema,
  mailtemplatesSchema,
  deadlineSchema,
  deadlinesSchema,
  roleSchema,
  rolesSchema,
  sessionApplicationSchema,
  studentSessionApplicationsSchema,
  userSchema,
  usersSchema,
  studentSchema,
  studentsSchema
};
