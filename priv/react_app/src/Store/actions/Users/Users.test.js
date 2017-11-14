import {Actions, actionTypes} from './../../../Store'
import {mockHttpResponse, createMockStore} from './../../../TestHelper'

describe("get current user start", () => {
  it("should create an empty action", () => {
    const expectedAction = {
      type: actionTypes.FETCH_CURRENT_USER
    }
    expect(Actions.users.getCurrentUserStart()).toEqual(expectedAction)
  })
})

describe("get current user success", () => {
  it("should create the correct action", () => {
    const testUser = { name: 'TestUser' }
    const expectedAction = {
      type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
      user: testUser
    }
    expect(Actions.users.getCurrentUserSuccess(testUser)).toEqual(expectedAction)
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

describe("get current user", () => {
  it("should call start action", () => {
    mockHttpResponse({status: 200, body: {}})
    const store = createMockStore()

    return store.dispatch(Actions.users.getCurrentUser())
    .then(() => {
      const calledActions = store.getActions()
      expect(calledActions[0]).toEqual(Actions.users.getCurrentUserStart())
    })
  })

  it("should call success action on success", () => {
    const testUser = { id: 1, name: 'Test User' }
    const httpResponseBody = {
      data: testUser
    }
    mockHttpResponse({status: 200, body: httpResponseBody})

    const expectedActions = [
      Actions.users.getCurrentUserStart(),
      Actions.users.getCurrentUserSuccess(testUser)
    ]

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

    const store = createMockStore()

    return store.dispatch(Actions.users.getCurrentUser())
    .then(() => {
      const calledActions = store.getActions()
      expect(calledActions).toEqual(expectedActions)
    })
  })
})
