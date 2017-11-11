/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import Normalize from '../../normalizr/normalize';
import actionTypes from '../../ActionTypes';
import { schema, normalize } from 'normalizr';
import {mergeDeepRight} from 'ramda'

let initialState = {
  companies: {},
  attributes: {},
  categories: {},
  entries: {},
  users: {}
}

const entities = (state = initialState, action) => {

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

export default entities;
