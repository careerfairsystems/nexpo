/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

 import Normalize from '../normalizr/normalize.js';
 import actionTypes from '../ActionTypes.js';

let initialState = {companies: {}, attributes: {}, categories: {}, entries: {}, fetching: false}


const entities = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_COMPANIES_SUCCESS: 
      const normalizedData = Normalize.normalizeCompanies(action.companies, true).entities;
      const newState = {
        companies: normalizedData.companies,
        attributes: normalizedData.attributes,
        categories: normalizedData.categories,
        entries: normalizedData.entries,
        fetching: false 
      };
      return newState;

    case actionTypes.FETCH_COMPANIES_FAILURE:
      return {
        companies: state.companies,
        attributes: state.attributes,
        categories: state.categories,
        entries: state.entries,
        fetching: false
      };
    
    case actionTypes.FETCH_COMPANIES:
      return {
        companies: state.companies,
        attributes: state.attributes,
        categories: state.categories,
        entries: state.entries,
        fetching: true 
      };

    default:
      return state;
  }
}

export default entities;
