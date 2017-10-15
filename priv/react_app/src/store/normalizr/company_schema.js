import { schema, normalize} from 'normalizr';

const category = new norm.schema.Entity('categories');

const attribute = new norm.schema.Entity('attributes', {
    category: category
});

const entry = new norm.schema.Entity('entries', {
    attribute: attribute,
});

const company = new norm.schema.Entity('companies', {
    entries: [entry]
});


export default doNormalise = (originalData) =>  norm.normalize(originalData, company);
