/*
*   This file contains methods to access the /companies reasource on the server.
*/


class CompanyApi {

	static getCompanies() {
		return fetch('/api/companies')
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