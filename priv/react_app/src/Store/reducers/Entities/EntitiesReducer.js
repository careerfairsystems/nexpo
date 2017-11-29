/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */
import {actionTypes} from './../../../Store'
import Normalize from '../../normalizr/normalize';
import { schema, normalize } from 'normalizr';
import {mergeDeepRight} from 'ramda'

export type EntitiesState = {
  companies: {},
  attributes: {},
  categories: {},
  entries: {},
  users: {}
}

let initialState = {
  companies: {},
  attributes: {},
  categories: {},
  entries: {},
  users: {}
}

export const EntitiesReducer = (state = initialState, action): EntitiesState => {

  let normalized, user

  switch(action.type) {
    case actionTypes.FETCH_COMPANIES_SUCCESS:
      normalized = Normalize.normalizeCompanies(action.companies, true)
      return mergeDeepRight(state, normalized.entities)

    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
      user = new schema.Entity('users')
      normalized = normalize(action.user, user)
      return mergeDeepRight(state, normalized.entities)

    default:
      return state;
  }
}
