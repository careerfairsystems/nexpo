import {actionTypes} from './../../../Store'
import API from '../../../API'

export function getAllCompaniesIsLoading() {
	return {
		type: actionTypes.FETCH_COMPANIES
	}
}

export function getAllCompaniesSuccess(companies) {
	return {
		type: actionTypes.FETCH_COMPANIES_SUCCESS,
		companies
	}
}

export function getAllCompaniesFailure() {
	return {
		type: actionTypes.FETCH_COMPANIES_FAILURE
	}
}

export function getAllCompanies() {
	return dispatch => {
		dispatch(getAllCompaniesIsLoading())
    return API.companies.getAll()
    .then((companies) => {
			dispatch(getAllCompaniesSuccess(companies.data));
		})
    .catch(() => {
      dispatch(getAllCompaniesFailure());
    })
	};
}
