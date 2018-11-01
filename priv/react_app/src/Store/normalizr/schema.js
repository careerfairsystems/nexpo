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

type Entity = (
  key: string,
  definition?: {},
  options?: { model?: Function, merge?: Function }
) => schema.Entity;
const entity: Entity = (key, definition = {}, options = {}) =>
  new schema.Entity(key, definition, {
    mergeStrategy: options.merge,
    processStrategy: options.model
  });

const mailtemplateSchema = () => entity('mailtemplates');
const mailtemplatesSchema = () => [mailtemplateSchema()];

const deadlineSchema = () => entity('deadlines');
const deadlinesSchema = () => [deadlineSchema()];

const programmeSchema = () => entity('programmes');
const programmesSchema = () => [programmeSchema()];

const sessionApplicationSchema = () => {
  const company = entity(
    'companies',
    {},
    { model: hasMany('studentSessionApplications') }
  );
  const student = entity(
    'students',
    {},
    { model: hasMany('studentSessionApplications') }
  );
  const application = entity('studentSessionApplications', {
    company,
    student
  });
  return application;
};
const studentSessionApplicationsSchema = () => [sessionApplicationSchema()];
const studentSessionSchema = () => {
  const company = entity(
    'companies',
    {},
    { model: hasMany('studentSessions') }
  );
  const student = entity('students', {}, { model: hasMany('studentSessions') });
  const session = entity('studentSessions', {
    company,
    student
  });
  return session;
};

const studentSessionsSchema = () => [studentSessionSchema()];

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
  const student = entity('students', { user });
  const studentSession = entity(
    'studentSessions',
    { student },
    { model: belongsTo('company') }
  );
  const studentSessionTimeSlot = entity(
    'studentSessionTimeSlots',
    { studentSession },
    { model: belongsTo('company') }
  );
  const studentSessionApplication = entity(
    'studentSessionApplications',
    { student },
    { model: belongsTo('company') }
  );
  const company = entity('companies', {
    entries: [entry],
    users: [user],
    studentSessionTimeSlots: [studentSessionTimeSlot],
    studentSessionApplications: [studentSessionApplication]
  });

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
  const programme = entity('programmes', {}, { model: belongsTo('student') });
  const student = entity(
    'students',
    { programme },
    { model: belongsTo('user') }
  );

  return student;
};

const studentsSchema = () => [studentSchema()];

const userSchema = () => {
  const company = entity('companies');
  const sessionApplication = entity(
    'studentSessionApplications',
    { company },
    { model: belongsTo('student') }
  );
  const studentSession = entity(
    'studentSessions',
    { company },
    { model: belongsTo('student') }
  );
  const programme = entity('programmes', {}, { model: belongsTo('student') });
  const student = entity(
    'students',
    {
      programme,
      studentSessionApplications: [sessionApplication],
      studentSessions: [studentSession]
    },
    { model: belongsTo('user') }
  );
  const role = entity('roles', {}, { model: belongsTo('user') });
  const representative = entity(
    'representatives',
    { company },
    { model: belongsTo('user') }
  );

  const user = entity('users', { roles: [role], student, representative });

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
  programmeSchema,
  programmesSchema,
  roleSchema,
  rolesSchema,
  sessionApplicationSchema,
  studentSessionApplicationsSchema,
  studentSessionSchema,
  studentSessionsSchema,
  userSchema,
  usersSchema,
  studentSchema,
  studentsSchema
};
