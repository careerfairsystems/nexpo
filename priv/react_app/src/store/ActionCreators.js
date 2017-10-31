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
