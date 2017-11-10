import {Actions} from './../../../Store'
import actionTypes from './../../ActionTypes'
import {createMockStore} from '../../test/TestHelper'
import {mockLocalStorage, mockHttpResponse} from './../../../Test/Mocks'

describe("login success", () => {

  it("should create an action with a jwt", () => {
    const jwt = "random string"
    const expectedAction = {
      type: actionTypes.LOGIN_SUCCESS,
      jwt: jwt
    }
    expect(Actions.auth.loginSuccess(jwt)).toEqual(expectedAction)
  })

})

describe("login failure", () => {

  it("should create an action without a payload", () => {
    const expectedAction = { type: actionTypes.LOGIN_FAILURE }
    expect(Actions.auth.loginFailure()).toEqual(expectedAction)
  })

})

/**
 * I get network failure. How do I use nock?
 * /Joel
 */

// describe("login action", () => {

//   it("calls login success action on succes", () => {
//     const params = {email: 'test', password: 'test'}
//     nock('/api')
//       .post('/login')
//       .reply(200, { data: { jwt: 'string'} })
//     const expectedActions = [ Actions.loginSuccess ]

//     const store = createMockStore()

//     return store.dispatch(Actions.login(params))
//     .then(() => {
//       const calledActions = store.getActions()
//       expect(calledActions).toEqual(expectedActions)
//     })
//   })

//   it("calls login success action on succes", () => {
//     const params = {email: 'test', password: 'test'}
//     nock('/api')
//       .post('/login')
//       .reply(401, { type: 'error' })
//     const expectedActions = [ Actions.loginFailure ]

//     const store = createMockStore()

//     return store.dispatch(Actions.login(params))
//     .then(() => {
//       const calledActions = store.getActions()
//       expect(calledActions).toEqual(expectedActions)
//     })
//   })

// })

// describe("development login action", () => {

//     it("calls login success action on succes", () => {
//       nock('/api')
//         .post('/login')
//         .reply(200, { data: { jwt: 'string'} })
//       const expectedActions = [ Actions.loginSuccess ]

//       const store = createMockStore()

//       return store.dispatch(Actions.development_login('test@email.com'))
//       .then(() => {
//         const calledActions = store.getActions()
//         expect(calledActions).toEqual(expectedActions)
//       })
//     })

//     it("calls login success action on succes", () => {
//       nock('/api')
//         .post('/login')
//         .reply(401, { type: 'error' })
//       const expectedActions = [ Actions.loginFailure ]

//       const store = createMockStore()

//       return store.dispatch(Actions.development_login('test@email.com'))
//       .then(() => {
//         const calledActions = store.getActions()
//         expect(calledActions).toEqual(expectedActions)
//       })
//     })

//   })
