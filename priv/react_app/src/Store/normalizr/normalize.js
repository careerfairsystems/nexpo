/*
*		This class contains normalisation methods for the data recived by the server
*/

import { schema, normalize } from 'normalizr';

class Normalize {

	static _doNormalize(originalCompany, array = false) {
		const category = new schema.Entity('categories');

		const attribute = new schema.Entity('attributes', {
			category
		});

		const entry = new schema.Entity('entries', {
			attribute,
		});

		const company = new schema.Entity('companies', {
			entries: [entry]
		});
		if (array) {
			return normalize(originalCompany, [company]);
		} 
			return normalize(originalCompany, company);
		
	}

	static normalizeCompanies(originalCompanies) {
		return this._doNormalize(originalCompanies, true)
	}

	static normalizeCompany(originalCompany) {
		return this._doNormalize(originalCompany);
	}


}

export default Normalize;
