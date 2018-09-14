/*
*		This class contains normalisation methods for the data recived by the server
*/

import { schema, normalize } from 'normalizr';

class Normalize {
  static _doNormalizeCompany(originalCompany, array = false) {
    const category = new schema.Entity('categories');

    const attribute = new schema.Entity('attributes', {
      category
    });

    const entry = new schema.Entity('entries', {
      attribute
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
    return this._doNormalizeCompany(originalCompanies, true);
  }

  static normalizeCompany(originalCompany) {
    return this._doNormalizeCompany(originalCompany);
  }

  static _doNormalizeCategory(originalCategory, array = false) {
    const category = new schema.Entity('categories');
    if (array) {
      return normalize(originalCategory, [category]);
    }
    return normalize(originalCategory, category);
  }

  static normalizeCategories(originalCategories) {
    return this._doNormalizeCategory(originalCategories, true);
  }

  static normalizeCategory(originalCategory) {
    return this._doNormalizeCategory(originalCategory);
  }
}

export default Normalize;
