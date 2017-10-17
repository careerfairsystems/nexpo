/*
*   This file tests the possible actions in the system
*   See http://redux.js.org/docs/recipes/WritingTests.html for writing action and reducer tests.
*/
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import actionTypes from '../ActionTypes'
import { getAllCompanies } from '../ActionCreators'
import nock from 'nock'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_COMPANIES_SUCCESS when fetching companies has been done', () => {
    nock(process.env.REACT_APP_API_URL)
      .get('/companies')
      .reply(200, { companies: [{"name": "spotify", "id": 1}] })

    const expectedActions = [
      { type: actionTypes.FETCH_COMPANIES },
      { type: actionTypes.FETCH_COMPANIES_SUCCESS, companies: [{"name": "spotify", "id": 1}]  }
    ]
    const store = mockStore({ companies: [] })
    return store.dispatch(getAllCompanies(), () => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
    it('creates FETCH_COMPANIES_FAILURE when fetching companies could not be done', () => {
    nock(process.env.REACT_APP_API_URL)
      .get('/companies')
      .reply(500)

    const expectedActions = [
      { type: actionTypes.FETCH_COMPANIES },
      { type: actionTypes.FETCH_COMPANIES_FAILURE }
    ]
    const store = mockStore({ companies: [] })
    return store.dispatch(getAllCompanies(), () => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})