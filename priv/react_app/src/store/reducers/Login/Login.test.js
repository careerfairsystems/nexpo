import reducer from './Login'
import actionTypes from './../../ActionTypes'
import {getJwt, setJwt} from './../../../API'
import {mockLocalStorage} from '../../../Test/Mocks'
mockLocalStorage()

it("should return initial state", () => {
  expect(reducer(undefined, {})).toEqual({error: false, isLoggedIn: false})
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
