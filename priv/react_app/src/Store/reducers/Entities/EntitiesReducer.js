/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */
import { schema, normalize } from 'normalizr';
import { actionTypes } from '../..';
import Normalize from '../../normalizr/normalize';

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
    case actionTypes.FETCH_COMPANIES_SUCCESS: {
      const entry = new schema.Entity('entries');
      const company = new schema.Entity('companies', { entries: [entry] });

      normalized = normalize(action.companies, [company]);
      return { ...state, ...normalized.entities };
    }
    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      const attribute = new schema.Entity('attributes');
      const category = new schema.Entity('categories', {
        attributes: [attribute]
      });

      normalized = normalize(action.categories, [category]);
      return { ...state, ...normalized.entities };
    }
    case actionTypes.FETCH_CATEGORY_SUCCESS: {
      const company = new schema.Entity('companies');
      const entry = new schema.Entity('entries', { company });
      const attribute = new schema.Entity('attributes', { entries: [entry] });
      const category = new schema.Entity('categories', {
        attributes: [attribute]
      });

      normalized = normalize(action.category, category);
      return { ...state, ...normalized.entities };
    }
    case actionTypes.FETCH_CURRENT_USER_SUCCESS: {
      const user = new schema.Entity('users');

      normalized = normalize(action.user, user);
      return { ...state, ...normalized.entities };
    }
    default:
      return state;
  }
};

export default EntitiesReducer;
