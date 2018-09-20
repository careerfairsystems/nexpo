/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */
import { normalize } from 'normalizr';
import Schema from '../../normalizr/schema';
import { actionTypes } from '../..';

export type EntitiesState = {
  companies: {},
  attributes: {},
  categories: {},
  entries: {},
  users: {}
};

const initialState = {
  companies: {},
  attributes: {},
  categories: {},
  entries: {},
  users: {}
};

export const EntitiesReducer = (
  state = initialState,
  action
): EntitiesState => {
  let normalized;

  switch (action.type) {
    case actionTypes.FETCH_COMPANY_SUCCESS: {
      normalized = normalize(action.company, Schema.companySchema());
      return { ...state, ...normalized.entities };
    }
    case actionTypes.FETCH_COMPANIES_SUCCESS: {
      normalized = normalize(action.companies, Schema.companiesSchema());
      return { ...state, ...normalized.entities };
    }
    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      normalized = normalize(action.categories, Schema.categoriesSchema());
      return { ...state, ...normalized.entities };
    }
    case actionTypes.FETCH_CATEGORY_SUCCESS: {
      normalized = normalize(action.category, Schema.categorySchema());
      return { ...state, ...normalized.entities };
    }
    case actionTypes.FETCH_CURRENT_USER_SUCCESS: {
      normalized = normalize(action.user, Schema.userSchema());
      return { ...state, ...normalized.entities };
    }
    case actionTypes.POST_COMPANY_SUCCESS: {
      normalized = normalize(action.company, Schema.companySchema());
      return { ...state, ...normalized.entities };
    }
    default:
      return state;
  }
};

export default EntitiesReducer;
