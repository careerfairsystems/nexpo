/*
*   This file defines the dispatching of actions together with data to the reducer.
*/

import actions from './ActionTypes.js';
import API from '../API'

export function companiesAreLoading() {
	return {
		type: actions.FETCH_COMPANIES
	}
}

export function getAllCompaniesSuccess(companies) {
	return {
		type: actions.FETCH_COMPANIES_SUCCESS,
		companies
	}
}

export function getAllCompaniesFailure() {
	return {
		type: actions.FETCH_COMPANIES_FAILURE
	}
}


export function getAllCompanies() {
	return (dispatch) => {
		dispatch(companiesAreLoading());
		API.companies.getAll().then((companies) => {
			return dispatch(getAllCompaniesSuccess(companies.data));
		})
			.catch(() => {
				return dispatch(getAllCompaniesFailure());
			})
	};
}

export const loginFailure = () => {
  return {
    type: actions.LOGIN_FAILURE
  }
}

export const loginSuccess = (jwt: string) => {
  return {
    type: actions.LOGIN_SUCCESS,
    jwt
  }
}

export const login = ({email, password}) => {
  return dispatch => {
    API.session.login({email, password})
    .then(res => {
      if(res.type === 'error') {
        dispatch(loginFailure())
      }
      else {
        const jwt = res.data.jwt
        dispatch(loginSuccess(jwt))
      }
    })
  }
}

export const development_login = (email) => {
  return dispatch => {
    API.session.development_login({email})
    .then(res => {
      if(res.type === 'error') {
        dispatch(loginFailure())
      }
      else {
        const jwt = res.data.jwt
        dispatch(loginSuccess(jwt))
      }
    })
  }
}
