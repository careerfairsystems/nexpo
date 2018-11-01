import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
/**
 * Creates a mockstore that can be used while testing
 */
const middlewares = [thunk];
const createNewMockStore = configureMockStore(middlewares);
export const createMockStore = (initialState: ?{}) =>
  createNewMockStore(initialState);
