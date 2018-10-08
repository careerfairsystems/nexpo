/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */
import { normalize } from 'normalizr';
import { defaultsDeep, omit } from 'lodash/fp';
import Schema from '../../normalizr/schema';
import { camelCaseKeys } from '../../../Util/FormatHelper';
import { actionTypes } from '../..';

export type EntitiesState = {
  companies: {},
  attributes: {},
  categories: {},
  entries: {},
  roles: {},
  users: {},
  studentSessionApplications: {},
  students: {}
};

const initialState = {
  companies: {},
  attributes: {},
  categories: {},
  entries: {},
  roles: {},
  users: {},
  studentSessionApplications: {},
  students: {}
};

export const EntitiesReducer = (
  state = initialState,
  action
): EntitiesState => {
  let normalized;

  switch (action.type) {
    case actionTypes.FETCH_COMPANIES_SUCCESS: {
      normalized = normalize(action.companies, Schema.companiesSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.FETCH_COMPANY_SUCCESS:
    case actionTypes.POST_COMPANY_SUCCESS:
    case actionTypes.PUT_COMPANY_SUCCESS: {
      normalized = normalize(action.company, Schema.companySchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.DELETE_COMPANY_SUCCESS: {
      return { ...state, companies: omit(action.id, state.companies) };
    }
    case actionTypes.FETCH_ROLES_SUCCESS: {
      normalized = normalize(action.roles, Schema.rolesSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.FETCH_ROLE_SUCCESS:
    case actionTypes.POST_ROLE_SUCCESS:
    case actionTypes.PUT_ROLE_SUCCESS: {
      normalized = normalize(action.role, Schema.roleSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.DELETE_ROLE_SUCCESS: {
      return { ...state, roles: omit(action.id, state.roles) };
    }
    case actionTypes.FETCH_USERS_SUCCESS: {
      normalized = normalize(action.users, Schema.usersSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.POST_USER_SUCCESS:
    case actionTypes.PUT_USER_SUCCESS: {
      normalized = normalize(action.user, Schema.userSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.DELETE_USER_SUCCESS: {
      return { ...state, users: omit(action.id, state.users) };
    }
    case actionTypes.POST_STUDENT_SESSION_APPL_SUCCESS: {
      normalized = normalize(action.user, Schema.userSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.PUT_STUDENT_SESSION_APPL_SUCCESS: {
      normalized = normalize(
        action.sessionApplication,
        Schema.sessionApplicationSchema()
      );
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.DELETE_STUDENT_SESSION_APPL_SUCCESS: {
      return {
        ...state,
        studentSessionApplications: omit(
          action.id,
          state.studentSessionApplications
        )
      };
    }
    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      normalized = normalize(action.categories, Schema.categoriesSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.FETCH_CATEGORY_SUCCESS:
    case actionTypes.POST_CATEGORY_SUCCESS:
    case actionTypes.PUT_CATEGORY_SUCCESS: {
      normalized = normalize(action.category, Schema.categorySchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.DELETE_CATEGORY_SUCCESS: {
      return { ...state, categories: omit(action.id, state.categories) };
    }
    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
    case actionTypes.PUT_CURRENT_USER_SUCCESS: {
      normalized = normalize(action.user, Schema.userSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.DELETE_CURRENT_USER_SUCCESS: {
      return { ...state, users: omit(action.id, state.users) };
    }
    case actionTypes.PUT_CURRENT_STUDENT_SUCCESS: {
      normalized = normalize(action.student, Schema.studentSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    default:
      return state;
  }
};

export default EntitiesReducer;
