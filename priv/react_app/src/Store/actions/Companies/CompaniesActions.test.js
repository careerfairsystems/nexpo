import {Actions, actionTypes} from './../../../Store'
import {mockLocalStorage, mockHttpResponse, createMockStore} from './../../../TestHelper'

describe("getAllCompaniesIsLoading", () => {
  it("should create the correct action", () => {
    const expectecAction = {
      type: actionTypes.FETCH_COMPANIES
    }
    const action = Actions.companies.getAllCompaniesIsLoading()
    expect(action).toEqual(expectecAction)
  })
})

describe("getAllCompaniesSuccess", () => {
  it("should create the correct action", () => {
    const testCompanies = [
      {
        name: 'Company1'
      }
    ]

    const expectecAction = {
      type: actionTypes.FETCH_COMPANIES_SUCCESS,
      companies: testCompanies
    }
    const action = Actions.companies.getAllCompaniesSuccess(testCompanies)
    expect(action).toEqual(expectecAction)
  })
})

describe("getAllCompaniesFailure", () => {
  it("should create the correct action", () => {
    const expectecAction = {
      type: actionTypes.FETCH_COMPANIES_FAILURE
    }
    const action = Actions.companies.getAllCompaniesFailure()
    expect(action).toEqual(expectecAction)
  })
})

describe("getAllCompanies", () => {
  it("should call start action", () => {
    mockHttpResponse({status: 200, body: {}})
    mockLocalStorage()
    const store = createMockStore()

    return store.dispatch(Actions.companies.getAllCompanies())
    .then(() => {
      const calledActions = store.getActions()
      expect(calledActions[0]).toEqual(Actions.companies.getAllCompaniesIsLoading())
    })
  })

  it("should call success action on success", () => {
    const companies = [
      {
        name: 'Company1'
      }
    ]
    mockHttpResponse({status: 200, body: { data: companies } })

    const expectedActions = [
      Actions.companies.getAllCompaniesIsLoading(),
      Actions.companies.getAllCompaniesSuccess(companies)
    ]

    mockLocalStorage()
    const store = createMockStore()

    return store.dispatch(Actions.companies.getAllCompanies())
    .then(() => {
      const calledActions = store.getActions()
      expect(calledActions).toEqual(expectedActions)
    })
  })

  it("should call failure action on failure", () => {
    mockHttpResponse({status: 401, body: {}})

    const expectedActions = [
      Actions.companies.getAllCompaniesIsLoading(),
      Actions.companies.getAllCompaniesFailure()
    ]

    mockLocalStorage()
    const store = createMockStore()

    return store.dispatch(Actions.companies.getAllCompanies())
    .then(() => {
      const calledActions = store.getActions()
      expect(calledActions).toEqual(expectedActions)
    })
  })
})

