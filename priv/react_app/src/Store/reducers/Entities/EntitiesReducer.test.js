/*
*   This file tests the reducers handling incoming actions.
*   See http://redux.js.org/docs/recipes/WritingTests.html for writing action and reducer tests.
*/
import {Actions, actionTypes} from '../..'
import testData from './entitiesTestData'
import { EntitiesReducer } from './EntitiesReducer';

describe('Entities reducer', () => {
	it('should return the empty initial state', () => {
    const initialState = {
      companies: {},
      attributes: {},
      categories: {},
      entries: {},
      users: {}
    }
		expect(EntitiesReducer(undefined, {})).toEqual(initialState)
	})

	it('should handle FETCH_COMPANIES_SUCCESS', () => {
    const state = EntitiesReducer(undefined, Actions.companies.getAllCompaniesSuccess(testData.companies))

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
			expect(state.companies[companyKey].entries.forEach((entryNbr) => Object.keys(state.entries).find((entryKey) => entryNbr === entryKey)))
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

  it('should handle fetch current user success', () => {
    const testUser = { id: 1, name: 'Test User' }
    const action = Actions.users.getCurrentUserSuccess(testUser)
    const state = EntitiesReducer(undefined, action)

    expect(state).toMatchObject({
      users: {
        1: testUser
      }
    })
  })
})
