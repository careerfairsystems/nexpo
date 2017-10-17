import { schema, normalize } from 'normalizr';


class Normalize {

    normalizeCompany(originalCompany, array=false) {
        const category = new schema.Entity('categories');

        const attribute = new schema.Entity('attributes', {
            category: category
        });

        const entry = new schema.Entity('entries', {
            attribute: attribute,
        });

        const company = new schema.Entity('companies', {
            entries: [entry]
        });
        if (array) {
            return normalize(originalCompany, [company]);
        } else {
            return normalize(originalCompany, company);
        }
    }

}

export default Normalize;
