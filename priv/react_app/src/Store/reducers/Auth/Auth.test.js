import {Actions} from './../../../Store'
import reducer from './Auth'
import actionTypes from './../../ActionTypes'
import {getJwt, setJwt} from './../../../Util/JwtHelper'
import {mockLocalStorage} from '../../../Test/Mocks'
mockLocalStorage()

it("should return initial state", () => {
  expect(reducer(undefined, {})).toEqual({error: false, isLoggedIn: false})
})

describe("get current user success", () => {
  it("should change state so it is logged in", () => {
    const action = Actions.users.getCurrentUserSuccess()
    const state = reducer(undefined, action)
    expect(state).toMatchObject({isLoggedIn: true})
  })
})

describe("get current user failure", () => {
  it("should change state so it is NOT logged in", () => {
    const action = Actions.users.getCurrentUserFailure()
    const state = reducer({isLoggedIn: true}, action)
    expect(state).toMatchObject({isLoggedIn: false})
  })
})

describe(actionTypes.LOGIN_SUCCESS, () => {

  const action = {
    type: actionTypes.LOGIN_SUCCESS,
    jwt: "randomly-generated-string"
  }

  it("should set isLoggedIn to true", () => {
    const testState = reducer(undefined, action)
    expect(testState).toMatchObject({isLoggedIn: true})
  })

  it("should set global jwt", () => {
    const testState = reducer(undefined, action)
    expect(getJwt()).toBe(action.jwt)
  })

})

describe(actionTypes.LOGIN_FAILURE, () => {

  const action = {
    type: actionTypes.LOGIN_FAILURE
  }

  it("should set error to true", () => {
    const testState = reducer(undefined, action)
    expect(testState).toMatchObject({error: true})
  })

  it("should not set isLoggedIn to true", () => {
    const testState = reducer(undefined, action)
    expect(testState).toMatchObject({isLoggedIn: false})
  })

  it("should remove global jwt", () => {
    const jwt = 'random-string'
    setJwt(jwt)
    const testState = reducer(undefined, action)
    expect(getJwt()).toBe('')
  })

})
