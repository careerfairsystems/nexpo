/*
* This file contains methods to access the /companies reasource on the server.
*/ 

import config from '../config/config.js';

class CompanyApi {

    static apiUrl = config.server.baseApiUrl;
    static getCompanies() {
        return fetch(this.apiUrl + '/companies')
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json(); 
        })
        .catch((error) => {
            throw Error(error);
        })

    }

}

export default CompanyApi;