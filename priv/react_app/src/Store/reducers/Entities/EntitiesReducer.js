/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */
import { normalize } from 'normalizr';
import { mergeWith, omit, isArray } from 'lodash/fp';
import Schema from '../../normalizr/schema';
import { camelCaseKeys } from '../../../Util/FormatHelper';
import { actionTypes } from '../..';

type FETCH_COMPANIES_SUCCESS = {
  type: typeof actionTypes.FETCH_COMPANIES_SUCCESS,
  companies: Array<{}>
};

type CompanyActions = {
  type:
    | typeof actionTypes.FETCH_COMPANY_SUCCESS
    | typeof actionTypes.POST_COMPANY_SUCCESS
    | typeof actionTypes.PUT_COMPANY_SUCCESS,
  company: { id: number, name: string }
};
type DeleteAction = {
  type:
    | typeof actionTypes.DELETE_COMPANY_SUCCESS
    | typeof actionTypes.DELETE_ROLE_SUCCESS
    | typeof actionTypes.DELETE_USER_SUCCESS
    | typeof actionTypes.DELETE_STUDENT_SESSION_APPL_SUCCESS
    | typeof actionTypes.DELETE_CATEGORY_SUCCESS
    | typeof actionTypes.DELETE_PROGRAMME_SUCCESS
    | typeof actionTypes.DELETE_MAILTEMPLATE_SUCCESS
    | typeof actionTypes.DELETE_DEADLINE_SUCCESS,
  id: number
};

type FetchRoles = {
  type: typeof actionTypes.FETCH_ROLES_SUCCESS,
  roles: Array<{}>
};
type RoleActions = {
  type:
    | typeof actionTypes.FETCH_ROLE_SUCCESS
    | typeof actionTypes.POST_ROLE_SUCCESS
    | typeof actionTypes.PUT_ROLE_SUCCESS,
  role: { id: number, name: string }
};

type CreateStudentSessionAppl = {
  type: typeof actionTypes.POST_STUDENT_SESSION_APPL_SUCCESS,
  user: {}
};

type UpdateStudentSessionAppl = {
  type: typeof actionTypes.PUT_STUDENT_SESSION_APPL_SUCCESS,
  sessionApplication: {}
};

type UsersActions = {
  type: typeof actionTypes.FETCH_USERS_SUCCESS,
  users: Array<{}>
};

type UserActions = {
  type:
    | typeof actionTypes.FETCH_USER_SUCCESS
    | typeof actionTypes.POST_USER_SUCCESS
    | typeof actionTypes.PUT_USER_SUCCESS,
  user: {}
};
type CategoriesActions = {
  type: typeof actionTypes.FETCH_CATEGORIES_SUCCESS,
  categories: Array<{}>
};

type CategoryActions = {
  type:
    | typeof actionTypes.FETCH_CATEGORY_SUCCESS
    | typeof actionTypes.POST_CATEGORY_SUCCESS
    | typeof actionTypes.PUT_CATEGORY_SUCCESS,
  category: {}
};
type ProgrammesActions = {
  type: typeof actionTypes.FETCH_PROGRAMMES_SUCCESS,
  programmes: Array<{}>
};

type ProgrammeActions = {
  type:
    | typeof actionTypes.FETCH_PROGRAMME_SUCCESS
    | typeof actionTypes.POST_PROGRAMME_SUCCESS
    | typeof actionTypes.PUT_PROGRAMME_SUCCESS,
  programme: {}
};
type MailTemplatesActions = {
  type: typeof actionTypes.FETCH_MAILTEMPLATES_SUCCESS,
  mailtemplates: Array<{}>
};

type MailTemplateActions = {
  type:
    | typeof actionTypes.FETCH_MAILTEMPLATE_SUCCESS
    | typeof actionTypes.POST_MAILTEMPLATE_SUCCESS
    | typeof actionTypes.PUT_MAILTEMPLATE_SUCCESS,
  mailtemplate: {}
};
type DeadlinesActions = {
  type: typeof actionTypes.FETCH_DEADLINES_SUCCESS,
  deadlines: Array<{}>
};

type DeadlineActions = {
  type:
    | typeof actionTypes.FETCH_DEADLINE_SUCCESS
    | typeof actionTypes.POST_DEADLINE_SUCCESS
    | typeof actionTypes.PUT_DEADLINE_SUCCESS,
  deadline: {}
};

type CurrentUserActions = {
  type:
    | typeof actionTypes.FETCH_CURRENT_USER_SUCCESS
    | typeof actionTypes.PUT_CURRENT_USER_SUCCESS,
  user: {}
};

type CurrentUserDelete = {
  type: typeof actionTypes.DELETE_CURRENT_USER_SUCCESS
};

type CurrentStudentActions = {
  type: typeof actionTypes.PUT_CURRENT_STUDENT_SUCCESS,
  student: {}
};
type CurrentCompanyActions = {
  type: typeof actionTypes.FETCH_CURRENT_COMPANY_SUCCESS,
  company: {}
};
type StatisticsActions = {
  type: typeof actionTypes.FETCH_STATISTICS_SUCCESS,
  statistics: {}
};

export type EntitiesAction =
  | FETCH_COMPANIES_SUCCESS
  | CompanyActions
  | DeleteAction
  | FetchRoles
  | RoleActions
  | UsersActions
  | UserActions
  | CreateStudentSessionAppl
  | UpdateStudentSessionAppl
  | CategoriesActions
  | CategoryActions
  | ProgrammesActions
  | ProgrammeActions
  | MailTemplatesActions
  | MailTemplateActions
  | DeadlinesActions
  | DeadlineActions
  | CurrentUserActions
  | CurrentUserDelete
  | CurrentStudentActions
  | CurrentCompanyActions
  | StatisticsActions;

export type EntitiesState = {
  categories: {},
  attributes: {},
  companies: {},
  entries: {},
  deadlines: {},
  mailtemplates: {},
  programmes: {},
  roles: {},
  users: {},
  statistics: {},
  studentSessions: {},
  studentSessionTimeSlots: {},
  studentSessionApplications: {},
  students: {}
};

const initialState = {
  categories: {},
  attributes: {},
  companies: {},
  entries: {},
  deadlines: {},
  mailtemplates: {},
  programmes: {},
  roles: {},
  users: {},
  statistics: {},
  studentSessions: {},
  studentSessionTimeSlots: {},
  studentSessionApplications: {},
  students: {}
};

const handleMerge = (prev, next) => {
  if (isArray(prev)) return next;
  return undefined;
};

export const EntitiesReducer = (
  state: EntitiesState = initialState,
  incomingAction: EntitiesAction
): EntitiesState => {
  const action: EntitiesAction = camelCaseKeys(incomingAction);
  let normalized;

  switch (action.type) {
    case actionTypes.FETCH_COMPANIES_SUCCESS: {
      normalized = normalize(action.companies, Schema.companiesSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.FETCH_COMPANY_SUCCESS:
    case actionTypes.POST_COMPANY_SUCCESS:
    case actionTypes.POST_COMPANY_BULK_SUCCESS:
    case actionTypes.PUT_COMPANY_SUCCESS: {
      normalized = normalize(action.company, Schema.companySchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.DELETE_COMPANY_SUCCESS: {
      return { ...state, companies: omit([`${action.id}`], state.companies) };
    }
    case actionTypes.FETCH_ROLES_SUCCESS: {
      normalized = normalize(action.roles, Schema.rolesSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.FETCH_ROLE_SUCCESS:
    case actionTypes.POST_ROLE_SUCCESS:
    case actionTypes.PUT_ROLE_SUCCESS: {
      normalized = normalize(action.role, Schema.roleSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.DELETE_ROLE_SUCCESS: {
      return { ...state, roles: omit([`${action.id}`], state.roles) };
    }
    case actionTypes.FETCH_USERS_SUCCESS: {
      normalized = normalize(action.users, Schema.usersSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.POST_USER_SUCCESS:
    case actionTypes.PUT_USER_SUCCESS: {
      normalized = normalize(action.user, Schema.userSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.DELETE_USER_SUCCESS: {
      return { ...state, users: omit([`${action.id}`], state.users) };
    }
    case actionTypes.POST_STUDENT_SESSION_SUCCESS:
    case actionTypes.DELETE_STUDENT_SESSION_SUCCESS: {
      normalized = normalize(action.company, Schema.companySchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.POST_STUDENT_SESSION_APPL_SUCCESS: {
      normalized = normalize(action.user, Schema.userSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.PUT_STUDENT_SESSION_APPL_SUCCESS: {
      normalized = normalize(
        action.sessionApplication,
        Schema.sessionApplicationSchema()
      );
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.PUT_STUDENT_SESSION_SUCCESS: {
      normalized = normalize(
        action.studentSession,
        Schema.studentSessionSchema()
      );
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.DELETE_STUDENT_SESSION_APPL_SUCCESS: {
      const appls = state.studentSessionApplications;
      return {
        ...state,
        studentSessionApplications: omit([`${action.id}`], appls)
      };
    }
    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      normalized = normalize(action.categories, Schema.categoriesSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.FETCH_CATEGORY_SUCCESS:
    case actionTypes.POST_CATEGORY_SUCCESS:
    case actionTypes.PUT_CATEGORY_SUCCESS: {
      normalized = normalize(action.category, Schema.categorySchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.DELETE_CATEGORY_SUCCESS: {
      return { ...state, categories: omit([`${action.id}`], state.categories) };
    }
    case actionTypes.FETCH_PROGRAMMES_SUCCESS: {
      normalized = normalize(action.programmes, Schema.programmesSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.FETCH_PROGRAMME_SUCCESS:
    case actionTypes.POST_PROGRAMME_SUCCESS:
    case actionTypes.PUT_PROGRAMME_SUCCESS: {
      normalized = normalize(action.programme, Schema.programmeSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.DELETE_PROGRAMME_SUCCESS: {
      return { ...state, programmes: omit([`${action.id}`], state.programmes) };
    }
    case actionTypes.FETCH_MAILTEMPLATES_SUCCESS: {
      normalized = normalize(
        action.mailtemplates,
        Schema.mailtemplatesSchema()
      );
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.FETCH_MAILTEMPLATE_SUCCESS:
    case actionTypes.POST_MAILTEMPLATE_SUCCESS:
    case actionTypes.PUT_MAILTEMPLATE_SUCCESS: {
      normalized = normalize(action.mailtemplate, Schema.mailtemplateSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.DELETE_MAILTEMPLATE_SUCCESS: {
      return {
        ...state,
        mailtemplates: omit([`${action.id}`], state.mailtemplates)
      };
    }
    case actionTypes.FETCH_DEADLINES_SUCCESS: {
      normalized = normalize(action.deadlines, Schema.deadlinesSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.FETCH_DEADLINE_SUCCESS:
    case actionTypes.POST_DEADLINE_SUCCESS:
    case actionTypes.PUT_DEADLINE_SUCCESS: {
      normalized = normalize(action.deadline, Schema.deadlineSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.DELETE_DEADLINE_SUCCESS: {
      return { ...state, deadlines: omit([`${action.id}`], state.deadlines) };
    }
    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
    case actionTypes.PUT_CURRENT_USER_SUCCESS: {
      normalized = normalize(action.user, Schema.userSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.PUT_CURRENT_STUDENT_SUCCESS: {
      normalized = normalize(action.student, Schema.studentSchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.FETCH_CURRENT_COMPANY_SUCCESS: {
      normalized = normalize(action.company, Schema.companySchema());
      return mergeWith(handleMerge, state, normalized.entities);
    }
    case actionTypes.FETCH_STATISTICS_SUCCESS: {
      return { ...state, statistics: action.statistics };
    }
    case actionTypes.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export default EntitiesReducer;
