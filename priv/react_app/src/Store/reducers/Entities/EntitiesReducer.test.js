/*
 *   This file tests the reducers handling incoming actions.
 *   See http://redux.js.org/docs/recipes/WritingTests.html for writing action and reducer tests.
 */
import { omit } from 'lodash/fp';
import { normalize } from 'normalizr';

import { Actions } from '../..';
import testData from './entitiesTestData';
import { EntitiesReducer } from './EntitiesReducer';
import Schema from '../../normalizr/schema';

describe('Entities reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      categories: {},
      attributes: {},
      companies: {},
      entries: {},
      deadlines: {},
      mailtemplates: {},
      programmes: {},
      roles: {},
      users: {},
      studentSessions: {},
      studentSessionTimeSlots: {},
      studentSessionApplications: {},
      statistics: {},
      students: {}
    };
  });
  it('should return the empty initial state', () => {
    expect(EntitiesReducer(undefined, { type: 'NONE' })).toEqual(initialState);
  });

  it('should handle FETCH_COMPANIES_SUCCESS', () => {
    const state = EntitiesReducer(
      undefined,
      Actions.companies.getAllCompaniesSuccess(testData.companies)
    );

    expect(state).toHaveProperty('companies');
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

  it('should handle FETCH_COMPANY_SUCCESS', () => {
    const state = EntitiesReducer(
      undefined,
      Actions.companies.getCompanySuccess(testData.company)
    );

    expect(state).toHaveProperty('companies');
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

  it('should handle FETCH_ROLES_SUCCESS', () => {
    const state = EntitiesReducer(
      undefined,
      Actions.roles.getAllRolesSuccess(testData.roles)
    );

    expect(state).toHaveProperty('roles');
    expect(Object.keys(state.roles).length).toBeGreaterThan(0);
  });

  it('should handle FETCH_ROLE_SUCCESS', () => {
    const state = EntitiesReducer(
      undefined,
      Actions.roles.getRoleSuccess(testData.role)
    );

    expect(state).toHaveProperty('roles');
    expect(state).toHaveProperty('users');
    expect(Object.keys(state.roles).length).toBeGreaterThan(0);
    expect(Object.keys(state.users).length).toBeGreaterThan(0);
    // Check that each role's user exists in entries
    const roleKeys = Object.keys(state.roles);
    roleKeys.forEach(roleKey => {
      expect(
        state.roles[roleKey].users.forEach(userNbr =>
          Object.keys(state.users).find(userKey => userNbr === userKey)
        )
      );
    });
  });

  it('should handle FETCH_USERS_SUCCESS', () => {
    const state = EntitiesReducer(
      undefined,
      Actions.users.getAllUsersSuccess(testData.users)
    );

    expect(state).toHaveProperty('users');
    expect(Object.keys(state.users).length).toBeGreaterThan(0);
  });

  it('should handle FETCH_USER_SUCCESS', () => {
    const state = EntitiesReducer(
      undefined,
      Actions.users.getUserSuccess(testData.user)
    );

    expect(state).toHaveProperty('users');
    expect(state).toHaveProperty('roles');
    expect(Object.keys(state.users).length).toBeGreaterThan(0);
    expect(Object.keys(state.roles).length).toBeGreaterThan(0);
    // Check that each role's user exists in entries
    const userKeys = Object.keys(state.users);
    userKeys.forEach(userKey => {
      expect(
        state.users[userKey].roles.forEach(roleNbr =>
          Object.keys(state.roles).find(roleKey => roleNbr === roleKey)
        )
      );
    });
  });

  it('should handle FETCH_CATEGORIES_SUCCESS', () => {
    const state = EntitiesReducer(
      undefined,
      Actions.categories.getAllCategoriesSuccess(testData.categories)
    );

    expect(state).toHaveProperty('companies');
    expect(state).toHaveProperty('attributes');
    expect(state).toHaveProperty('categories');
    expect(state).toHaveProperty('entries');
    expect(Object.keys(state.categories).length).toBeGreaterThan(0);
    expect(Object.keys(state.attributes).length).toBeGreaterThan(0);
    // Check that each category's attribute exists in attributes
    const categoryKeys = Object.keys(state.categories);
    categoryKeys.forEach(categoryKey => {
      expect(
        state.categories[categoryKey].attributes.forEach(attrNbr =>
          Object.keys(state.attributes).find(attrKey => attrNbr === attrKey)
        )
      );
    });
  });

  it('should handle FETCH_CATEGORY_SUCCESS', () => {
    const state = EntitiesReducer(
      undefined,
      Actions.categories.getCategorySuccess(testData.category)
    );

    expect(state).toHaveProperty('companies');
    expect(state).toHaveProperty('attributes');
    expect(state).toHaveProperty('categories');
    expect(state).toHaveProperty('entries');
    expect(Object.keys(state.categories).length).toBeGreaterThan(0);
    expect(Object.keys(state.attributes).length).toBeGreaterThan(0);
    expect(Object.keys(state.entries).length).toBeGreaterThan(0);
    expect(Object.keys(state.companies).length).toBeGreaterThan(0);
    // Check that each category's attributes exists in attributes
    const categoryKeys = Object.keys(state.categories);
    categoryKeys.forEach(categoryKey => {
      expect(
        state.categories[categoryKey].attributes.forEach(attrNbr =>
          Object.keys(state.attributes).find(attrKey => attrNbr === attrKey)
        )
      );
    });
    // Check that each attribute's entries exists in entries
    const attributeKeys = Object.keys(state.attributes);
    attributeKeys.forEach(attributeKey => {
      expect(
        state.attributes[attributeKey].entries.forEach(entryNbr =>
          Object.keys(state.entries).find(entryKey => entryNbr === entryKey)
        )
      );
    });
    // Check that each entry's company exist
    const entryKeys = Object.keys(state.entries);
    entryKeys.forEach(entryKey => {
      expect(state.companies).toHaveProperty(
        state.entries[entryKey].company.toString()
      );
    });
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

  it('should handle fetch current user success', () => {
    const testUser = { id: '1', name: 'Test User' };
    const action = Actions.users.getCurrentUserSuccess(testUser);
    const state = EntitiesReducer(undefined, action);

    expect(state).toMatchObject({
      users: {
        '1': testUser
      }
    });
  });
  it('should handle fetch current user success', () => {
    const testUser = { id: '1', name: 'Test User' };
    const action = Actions.users.getCurrentUserSuccess(testUser);
    const state = EntitiesReducer(undefined, action);

    expect(state).toMatchObject({
      users: {
        '1': testUser
      }
    });
  });

  it('should handle delete current user success', () => {
    const testUser = { id: '1', name: 'Test User' };
    const action = Actions.users.deleteCurrentUserSuccess();
    const state = EntitiesReducer(
      { ...initialState, currentUser: testUser },
      action
    );

    expect(state).toMatchObject({
      currentUser: {}
    });
  });

  it('should handle delete session application', () => {
    const sessionApplicationId = '1';
    const action = Actions.studentSessions.deleteStudentSessionApplSuccess(
      sessionApplicationId
    );
    const state = EntitiesReducer(
      {
        ...initialState,
        studentSessionApplications: {
          '1': { id: '1', companyid: '1', studentid: '1' }
        }
      },
      action
    );

    expect(state).toMatchObject({
      studentSessionApplications: {}
    });
  });

  it('should handle update session application', () => {
    const data = { motivation: 'New Motivation' };
    const oldAppl = {
      id: '1',
      companyid: '1',
      studentid: '1',
      motivation: 'Old motivation'
    };

    const action = Actions.studentSessions.updateStudentSessionApplSuccess({
      ...oldAppl,
      ...data
    });
    const state = EntitiesReducer(
      {
        ...initialState,
        studentSessionApplications: testData.studentSessionApplications
      },
      action
    );

    expect(state).toMatchObject({
      studentSessionApplications: {
        '1': {
          id: '1',
          companyid: '1',
          studentid: '1',
          motivation: 'New Motivation'
        }
      }
    });
  });

  it('should handle fetch statistics success', () => {
    const statistics = { nbrApplicatons: 10 };

    const action = Actions.statistics.getAllStatisticsSuccess(statistics);
    const state = EntitiesReducer(
      { ...initialState, statistics: testData.statistics },
      action
    );

    expect(state).toMatchObject({
      statistics: { nbrApplicatons: 10 }
    });
  });

  it('should handle DELETE_COMPANY_SUCCESS', () => {
    const id = '1';
    const action = Actions.companies.deleteCompanySuccess(id);
    const normalized = normalize(testData.companies, Schema.companiesSchema());
    const state = EntitiesReducer(
      { ...initialState, companies: normalized },
      action
    );
    expect(state).toMatchObject({
      ...initialState,
      companies: omit([id], normalized)
    });
  });

  it('should handle DELETE_ROLES_SUCCESS', () => {
    const id = '1';
    const action = Actions.roles.deleteRoleSuccess(id);
    const normalized = normalize(testData.roles, Schema.rolesSchema());
    const state = EntitiesReducer(
      { ...initialState, roles: normalized },
      action
    );
    expect(state).toMatchObject({
      ...initialState,
      roles: omit([id], normalized)
    });
  });

  it('should handle DELETE_USER_SUCCESS', () => {
    const id = '1';
    const action = Actions.users.deleteUserSuccess(id);
    const normalized = normalize(testData.users, Schema.usersSchema());
    const state = EntitiesReducer(
      { ...initialState, users: normalized },
      action
    );
    expect(state).toMatchObject({
      ...initialState,
      users: omit([id], normalized)
    });
  });

  it('should handle DELETE_STUDENT_SESSION_APPL_SUCCESS', () => {
    const id = '1';
    const action = Actions.studentSessions.deleteStudentSessionApplSuccess(id);
    const state = EntitiesReducer(
      {
        ...initialState,
        studentSessionApplications: testData.studentSessionApplications
      },
      action
    );
    expect(state).toMatchObject(
      omit([id], testData.studentSessionApplications)
    );
  });

  it('should handle PUT_STUDENT_SESSION_SUCCESS', () => {
    const id = '1';
    const sessionApplication = {
      ...testData.studentSessions[id],
      studentSessionStatus: 1
    };
    const action = Actions.studentSessions.updateStudentSessionSuccess(
      sessionApplication
    );
    const state = EntitiesReducer(
      { ...initialState, studentSessions: testData.studentSessions },
      action
    );
    expect(state).toMatchObject({
      studentSessions: {
        '1': sessionApplication
      }
    });
  });
});
