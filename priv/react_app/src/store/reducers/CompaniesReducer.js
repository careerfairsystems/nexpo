/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

 import Normalize from '../normalizr/normalize.js';
 import actionTypes from '../ActionTypes.js';

let initialState = []


const companies = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_COMPANIES_SUCCESS: 
      const norm = new Normalize();
      const normalizedData = norm.normalizeCompany(action.companies, true);
      const companies = normalizedData.entities.companies;
      const companyKeys = Object.keys(companies);
      const companyData = companyKeys.map((key) => {
        const company = companies[key];
        return {"name": company.name, "id": company.id, "email": company.email}
      })
      const newState = companyData;
      return newState;

    case actionTypes.FETCH_COMPANIES_FAILURE:
      return state;
    
    case actionTypes.FETCH_COMPANIES:
      //Vad ska vi göra här? 
      return state;

    default:
      return state;
  }
}

export default companies;
