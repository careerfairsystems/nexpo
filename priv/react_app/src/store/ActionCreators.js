import actions from './ActionTypes.js';
import CompanyApi from '../api/CompanyApi.js';


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
        CompanyApi.getCompanies().then((companies) => {
            return dispatch(getAllCompaniesSuccess(companies.data));
        })
        .catch(() => {
            return dispatch(getAllCompaniesFailure());
        }) 
    };
}
