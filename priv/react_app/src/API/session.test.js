import API from './index'
import {mockHttpResponse, mockEnvironment} from './../TestHelper'
import UnreachableCodeReachedError from './../Errors/UnreachableCodeReachedError'
import ApiError from './../Errors/ApiError'

describe("development_login", () => {

  const method = () => API.session.development_login({email: 'test'})

  it("should throw Error in production", () => {
    mockEnvironment.runInProduction(() => {
      expect(method).toThrow(UnreachableCodeReachedError)
    })
  })

  it("should return resolved promise on success", () => {
    const response = {test: 'success'}
    mockHttpResponse({
      status: 200,
      body: response
    })

    expect.assertions(1)

    return method()
    .then(res => expect(res).toEqual(response))
  })

  it("should return a rejected promise on failure", () => {
    const response = {test: 'failure'}
    mockHttpResponse({
      status: 404,
      body: response
    })

    expect.assertions(1)

    return method()
    .catch(err => expect(err).toBeInstanceOf(ApiError))
  })

})

describe("login", () => {

  const method = () => API.session.login({email: 'test', password: 'test'})

  it("should return a resolved promise on success", () => {
    const response = {test: 'success'}
    mockHttpResponse({
      status: 200,
      body: response
    })

    expect.assertions(1)

    return method()
    .then(res => expect(res).toEqual(response))
  })

  it("should return a rejected promise on failure", () => {
    const response = {test: 'failure'}
    mockHttpResponse({
      status: 404,
      body: response
    })

    expect.assertions(1)

    return method()
    .catch(err => expect(err).toBeInstanceOf(ApiError))
  })
})
