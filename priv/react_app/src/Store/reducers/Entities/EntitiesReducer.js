/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import Normalize from '../../normalizr/normalize';
import actionTypes from '../../ActionTypes';
import {mergeDeepRight} from 'ramda'

let initialState = {
  companies: {},
  attributes: {},
  categories: {},
  entries: {}
}

const entities = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_COMPANIES_SUCCESS:
      const normalized = Normalize.normalizeCompanies(action.companies, true)
      return mergeDeepRight(state, normalized.entities)

    default:
      return state;
  }
}

export default entities;
