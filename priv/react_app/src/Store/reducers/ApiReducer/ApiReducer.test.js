/*
*   This file tests the reducers handling incoming actions.
*   See http://redux.js.org/docs/recipes/WritingTests.html for writing action and reducer tests.
*/
import { Actions, actionTypes } from './../../../Store'
import { ApiReducer, ApiState } from './ApiReducer';
import { forgot_password_request, forgot_password_success, replace_forgotten_password_request, replace_forgotten_password_success, replace_forgotten_password_failure } from '../../actions/Accounts/AccountsActions';


it("should set the correct initial state", () => {
  const initialState: ApiState = {
    companies: {
      fetching: false, errors: undefined, success: false,
    },
    current_user: {
      fetching: false, errors: undefined, success: false,
    },
    forgot_password: {
      fetching: false, errors: undefined, success: false,
    },
    login: {
      fetching: false, errors: undefined, success: false,
    },
    replace_password: {
      fetching: false, errors: undefined, success: false,
    },
    verify_forgot_password_key: {
      fetching: false, errors: undefined, success: false,
    }
  }
  const state = ApiReducer(undefined, {})
  expect(state).toEqual(initialState)
})

describe("fetch companies", () => {
  it("should handle request start", () => {
    const startState: ApiState = {
      companies: {
        fetching: false,
        errors: {},
        success: true
      }
    }
    const expected: ApiState = {
      companies: {
        fetching: true,
        errors: undefined,
        success: false
      }
    }
    const state = ApiReducer(startState, Actions.companies.getAllCompaniesIsLoading())
    expect(state).toMatchObject(expected)
  })

  it("should handle success", () => {
    const startState: ApiState = {
      companies: {
        fetching: true,
        errors: undefined,
        success: false
      }
    }
    const expected: ApiState = {
      companies: {
        fetching: false,
        errors: undefined,
        success: true
      }
    }
    const state = ApiReducer(startState, Actions.companies.getAllCompaniesSuccess())
    expect(state).toMatchObject(expected)
  })

  it("should handle failure", () => {
    const startState: ApiState = {
      companies: {
        fetching: true,
        errors: undefined,
        success: true
      }
    }
    const expected: ApiState = {
      companies: {
        fetching: false,
        errors: ['There was an error'],
        success: false
      }
    }
    const state = ApiReducer(startState, Actions.companies.getAllCompaniesFailure())
    expect(state).toMatchObject(expected)
  })
})

describe("forgot_password action", () => {
  it("should handle request action", () => {
    const startState: ApiState = {
      forgot_password: {fetching: false, errors: undefined, success: true}
    }
    const expected: ApiState = {
      forgot_password: {fetching: true, errors: undefined, success: false}
    }
    const state = ApiReducer(startState, forgot_password_request())
    expect(state).toMatchObject(expected)
  })

  it("should handle success action", () => {
    const startState: ApiState = {
      forgot_password: {fetching: true, errors: {}, success: false}
    }
    const expected: ApiState = {
      forgot_password: {fetching: false, errors: undefined, success: true}
    }
    const state = ApiReducer(startState, forgot_password_success())
    expect(state).toMatchObject(expected)
  })
})

describe("replace forgotten password action", () => {
  it("should handle request action", () => {
    const startState: ApiState = {
      replace_password: {
        fetching: false,
        errors: {},
        success: true
      }
    }
    const expected: ApiState = {
      replace_password: {
        fetching: true,
        errors: undefined,
        success: false
      }
    }
    const state = ApiReducer(startState, replace_forgotten_password_request())
    expect(state).toMatchObject(expected)
  })

  it("should handle success action", () => {
    const startState: ApiState = {
      replace_password: {
        fetching: true,
        errors: {},
        success: false
      }
    }
    const expected: ApiState = {
      replace_password: {
        fetching: false,
        errors: undefined,
        success: true
      }
    }
    const state = ApiReducer(startState, replace_forgotten_password_success())
    expect(state).toMatchObject(expected)
  })

  it("should handle failure action", () => {
    const startState: ApiState = {
      replace_password: {
        fetching: true,
        errors: {},
        success: true
      }
    }

    const errors = {
      password: ['some-error']
    }
    const expected: ApiState = {
      replace_password: {
        fetching: false,
        errors: errors,
        success: false
      }
    }
    const state = ApiReducer(startState, replace_forgotten_password_failure(errors))
    expect(state).toMatchObject(expected)
  })
})
