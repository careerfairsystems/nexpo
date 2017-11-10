import {Actions} from './../../../Store'
import actionTypes from './../../ActionTypes'
import {mockHttpResponse, mockLocalStorage} from './../../../Test/Mocks'
import {createMockStore} from './../../test/TestHelper'

describe("get current user start", () => {
  it("should create an empty action", () => {
    const expectedAction = {
      type: actionTypes.FETCH_CURRENT_USER
    }
    expect(Actions.users.getCurrentUserStart()).toEqual(expectedAction)
  })
})

describe("get current user success", () => {
  it("should create an empty action", () => {
    const expectedAction = {
      type: actionTypes.FETCH_CURRENT_USER_SUCCESS
    }
    expect(Actions.users.getCurrentUserSuccess()).toEqual(expectedAction)
  })
})

describe("get current user failure", () => {
  it("should create an empty action", () => {
    const expectedAction = {
      type: actionTypes.FETCH_CURRENT_USER_FAILURE
    }
    expect(Actions.users.getCurrentUserFailure()).toEqual(expectedAction)
  })
})

describe("verify session", () => {
  it("should call start action", () => {
    mockHttpResponse({status: 200, body: {}})

    mockLocalStorage()
    const store = createMockStore()

    return store.dispatch(Actions.users.getCurrentUser())
    .then(() => {
      const calledActions = store.getActions()
      expect(calledActions[0]).toEqual(Actions.users.getCurrentUserStart())
    })
  })

  it("should call success action on success", () => {
    const httpResponseBody = { data: { user: {}}}
    mockHttpResponse({status: 200, body: httpResponseBody})

    const expectedActions = [
      Actions.users.getCurrentUserStart(),
      Actions.users.getCurrentUserSuccess()
    ]

    mockLocalStorage()
    const store = createMockStore()

    return store.dispatch(Actions.users.getCurrentUser())
    .then(() => {
      const calledActions = store.getActions()
      expect(calledActions).toEqual(expectedActions)
    })
  })

  it("should call failure action on failure", () => {
    mockHttpResponse({status: 401, body: {}})

    const expectedActions = [
      Actions.users.getCurrentUserStart(),
      Actions.users.getCurrentUserFailure()
    ]

    mockLocalStorage()
    const store = createMockStore()

    return store.dispatch(Actions.users.getCurrentUser())
    .then(() => {
      const calledActions = store.getActions()
      expect(calledActions).toEqual(expectedActions)
    })
  })
})
