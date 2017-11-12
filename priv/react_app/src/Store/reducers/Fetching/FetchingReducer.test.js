/*
*   This file tests the reducers handling incoming actions.
*   See http://redux.js.org/docs/recipes/WritingTests.html for writing action and reducer tests.
*/
import {Actions, actionTypes} from './../../../Store'
import reducer from './FetchingReducer'

describe('Fetching reducer', () => {

  it("should set the correct initial state", () => {
    const initialState = {
      companies: false
    }
    const state = reducer(undefined, {})
    expect(state).toEqual(initialState)
  })

  describe("fetch companies", () => {
    it("should handle setting it true", () => {
      const state = reducer(undefined, Actions.companies.getAllCompaniesIsLoading())
      expect(state).toMatchObject({companies: true})
    })

    it("should handle setting it false", () => {
      const startState = {companies: true}
      let state = reducer(startState, Actions.companies.getAllCompaniesFailure())
      expect(state).toMatchObject({companies: false})

      state = reducer(startState, Actions.companies.getAllCompaniesFailure())
      expect(state).toMatchObject({companies: false})
    })
  })

})
