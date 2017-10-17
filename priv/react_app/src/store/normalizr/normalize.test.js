import testData from './test-data.js';
import Normalize from './normalize.js';

const normalizer = new Normalize();

test('normalizes a company object to entities', () => {
	const normalized = normalizer.normalizeCompany(testData.company_object)
	expect(normalized.entities).toHaveProperty('categories');
	expect(normalized.entities).toHaveProperty('entries');
	expect(normalized.entities).toHaveProperty('attributes');
	expect(normalized.entities).toHaveProperty('companies');
});

test('normalizes a company array to entities', () => {
	const normalized = normalizer.normalizeCompany(testData.company_array, true);
	expect(normalized.entities).toHaveProperty('categories');
	expect(normalized.entities).toHaveProperty('entries');
	expect(normalized.entities).toHaveProperty('attributes');
	expect(normalized.entities).toHaveProperty('companies');
});
