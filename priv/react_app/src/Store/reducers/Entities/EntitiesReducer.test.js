/*
*   This file tests the reducers handling incoming actions.
*   See http://redux.js.org/docs/recipes/WritingTests.html for writing action and reducer tests.
*/
import { Actions, actionTypes } from '../..';
import testData from './entitiesTestData';
import { EntitiesReducer } from './EntitiesReducer';

describe('Entities reducer', () => {
  it('should return the empty initial state', () => {
    const initialState = {
      companies: {},
      attributes: {},
      categories: {},
      entries: {},
      users: {}
    };
    expect(EntitiesReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_COMPANIES_SUCCESS', () => {
    const state = EntitiesReducer(
      undefined,
      Actions.companies.getAllCompaniesSuccess(testData.companies)
    );

    expect(state).toHaveProperty('companies');
    expect(state).toHaveProperty('attributes');
    expect(state).toHaveProperty('categories');
    expect(state).toHaveProperty('entries');
    expect(Object.keys(state.companies).length).toBeGreaterThan(0);
    expect(Object.keys(state.entries).length).toBeGreaterThan(0);
    // Check that each company's entry exists in entries
    const companyKeys = Object.keys(state.companies);
    companyKeys.forEach(companyKey => {
      expect(
        state.companies[companyKey].entries.forEach(entryNbr =>
          Object.keys(state.entries).find(entryKey => entryNbr === entryKey)
        )
      );
    });
  });

  it('should handle FETCH_CATEGORIES_SUCCESS', () => {
    const state = EntitiesReducer(
      undefined,
      Actions.categories.getAllCategoriesSuccess(testData.categories)
    );

    expect(state).toHaveProperty('categories');
    expect(state).toHaveProperty('attributes');
    expect(state).toHaveProperty('categories');
    expect(state).toHaveProperty('entries');
    expect(Object.keys(state.categories).length).toBeGreaterThan(0);
    expect(Object.keys(state.attributes).length).toBeGreaterThan(0);
    // Check that each category's attribute exists in attributes
    const categoryKeys = Object.keys(state.categories);
    categoryKeys.forEach(categoryKey => {
      expect(
        state.categories[categoryKey].attributes.forEach(entryNbr =>
          Object.keys(state.attributes).find(entryKey => entryNbr === entryKey)
        )
      );
    });
  });

  it('should handle fetch current user success', () => {
    const testUser = { id: 1, name: 'Test User' };
    const action = Actions.users.getCurrentUserSuccess(testUser);
    const state = EntitiesReducer(undefined, action);

    expect(state).toMatchObject({
      users: {
        1: testUser
      }
    });
  });
});
