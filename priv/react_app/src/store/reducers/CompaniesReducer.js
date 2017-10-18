/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

 import Normalize from '../normalizr/normalize.js';
 import actionTypes from '../ActionTypes.js';

let initialState = {companies: [], fetching: false}


const companyState = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_COMPANIES_SUCCESS: 
      const normalizedData=  Normalize.normalizeCompanies(action.companies);
      const companies = normalizedData.entities.companies;
      const companyKeys = Object.keys(companies);
      const companyData = companyKeys.map((key) => {
        const company = companies[key];
        return {"name": company.name, "id": company.id, "email": company.email}
      })
      const newState = {companies: companyData, fetching: false };
      return newState;

    case actionTypes.FETCH_COMPANIES_FAILURE:
      return {companies: [], fetching: false };
    
    case actionTypes.FETCH_COMPANIES:
      return {companies: [], fetching: true };

    default:
      return state;
  }
}

export default companyState;
