/*
*   This file contains methods to access the /companies reasource on the server.
*/


class CompanyApi {

	static apiUrl = process.env.REACT_APP_API_URL;
	static getCompanies() {
		console.log(this.apiUrl)
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