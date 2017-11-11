/*
*   This file tests the reducers handling incoming actions.
*   See http://redux.js.org/docs/recipes/WritingTests.html for writing action and reducer tests.
*/
import {Actions} from './../../../Store'
import reducer from './EntitiesReducer'
import actionTypes from '../../ActionTypes'
import testData from './entitiesTestData'

describe('Companies reducer', () => {
	it('should return the empty initial state', () => {
    const initialState = {
      companies: {},
      attributes: {},
      categories: {},
      entries: {},
      fetching: false
    }
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should handle FETCH_COMPANIES', () => {
    const state = reducer(undefined, Actions.companies.getAllCompaniesIsLoading())
		expect(state).toMatchObject({ companies: {}, fetching: true })
	})

	it('should handle FETCH_COMPANIES_SUCCESS', () => {
    const state = reducer(undefined, Actions.companies.getAllCompaniesSuccess(testData.companies))

		expect(state).toHaveProperty('companies')
		expect(state).toHaveProperty('attributes')
		expect(state).toHaveProperty('categories')
		expect(state).toHaveProperty('entries')
		expect(Object.keys(state.companies).length).toBeGreaterThan(0)
		expect(Object.keys(state.categories).length).toBeGreaterThan(0)
		expect(Object.keys(state.attributes).length).toBeGreaterThan(0)
		expect(Object.keys(state.entries).length).toBeGreaterThan(0)
		// Check that each company's entry exists in entries
		const companyKeys = Object.keys(state.companies);
		companyKeys.forEach((companyKey) => {
			expect(state.companies[companyKey].entries.forEach((entryNbr) => {
				return Object.keys(state.entries).find((entryKey) => {
					return entryNbr === entryKey;
				})
			}))
		})
		// Check that each entry's attribute exist
		const entryKeys = Object.keys(state.entries);
		entryKeys.forEach((entryKey) => {
			expect(state.attributes).toHaveProperty(state.entries[entryKey].attribute.toString())
		})
		// Check that each attribute's category exist
		const attributeKeys = Object.keys(state.attributes)
		attributeKeys.forEach((attributeKey) => {
			expect(state.categories).toHaveProperty(state.attributes[attributeKey].category.toString())
		})
	})
})
