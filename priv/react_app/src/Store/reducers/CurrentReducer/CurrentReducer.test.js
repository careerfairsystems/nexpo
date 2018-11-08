/*
*   This file tests the reducers handling incoming actions.
*   See http://redux.js.org/docs/recipes/WritingTests.html for writing action and reducer tests.
*/
import { Actions } from '../..';
import { CurrentReducer } from './CurrentReducer';

describe('Current reducer', () => {
  it('should return the empty initial state', () => {
    const initialState = {
      user: undefined
    };
    expect(CurrentReducer(undefined, { type: 'NONE' })).toEqual(initialState);
  });

  it('should handle current user', () => {
    const testUser = { id: '1', name: 'Test User' };
    const state = CurrentReducer(
      undefined,
      Actions.users.getCurrentUserSuccess(testUser)
    );
    expect(state).toMatchObject({ user: testUser.id });
  });

  it('should handle delete current user', () => {
    const state = CurrentReducer(
      { user: 1 },
      Actions.users.deleteCurrentUserSuccess()
    );
    expect(state).toMatchObject({ user: null });
  });
});
