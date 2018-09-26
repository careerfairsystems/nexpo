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
  users: {}
};

const initialState = {
  companies: {},
  attributes: {},
  categories: {},
  entries: {},
  roles: {},
  users: {}
};

export const EntitiesReducer = (
  state = initialState,
  action
): EntitiesState => {
  let normalized;

  switch (action.type) {
    case actionTypes.FETCH_COMPANY_SUCCESS:
    case actionTypes.POST_COMPANY_SUCCESS:
    case actionTypes.PUT_COMPANY_SUCCESS: {
      normalized = normalize(action.company, Schema.companySchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.FETCH_COMPANIES_SUCCESS: {
      normalized = normalize(action.companies, Schema.companiesSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.DELETE_COMPANY_SUCCESS: {
      return { ...state, companies: omit(action.id, state.companies) };
    }
    case actionTypes.FETCH_ROLE_SUCCESS:
    case actionTypes.POST_ROLE_SUCCESS:
    case actionTypes.PUT_ROLE_SUCCESS:
    case actionTypes.DELETE_ROLE_SUCCESS: {
      normalized = normalize(action.role, Schema.roleSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.FETCH_ROLES_SUCCESS: {
      normalized = normalize(action.roles, Schema.rolesSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.POST_USER_SUCCESS:
    case actionTypes.PUT_USER_SUCCESS:
    case actionTypes.DELETE_USER_SUCCESS: {
      normalized = normalize(action.user, Schema.userSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.FETCH_USERS_SUCCESS: {
      normalized = normalize(action.users, Schema.usersSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.FETCH_CATEGORY_SUCCESS:
    case actionTypes.POST_CATEGORY_SUCCESS:
    case actionTypes.PUT_CATEGORY_SUCCESS:
    case actionTypes.DELETE_CATEGORY_SUCCESS: {
      normalized = normalize(action.category, Schema.categorySchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      normalized = normalize(action.categories, Schema.categoriesSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
    case actionTypes.PUT_CURRENT_USER_SUCCESS:
    case actionTypes.DELETE_CURRENT_USER_SUCCESS: {
      normalized = normalize(action.user, Schema.userSchema());
      return defaultsDeep(state, camelCaseKeys(normalized.entities));
    }
    default:
      return state;
  }
};

export default EntitiesReducer;
